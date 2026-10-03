import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";

interface Patient {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    birth_date: string | null;
    email: string | null;
}

const PatientScreen = () => {
    const db = useSQLiteContext();
    const { user } = useUser();

    const [inputText, setInputText] = useState<string>('');
    const [inputAddress, setInputAddress] = useState<string>('');
    const [inputPhone, setInputPhone] = useState<string>('');
    const [inputBirthDate, setInputBirthDate] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>('');

    const [patients, setPatients] = useState<Patient[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);

    useEffect(() => {
        const loadSettings = async () => {
            const darkMode = await AsyncStorage.getItem('darkMode');
            if (darkMode) {
                setDarkModeEnabled(!!darkMode);
            }
        };
        loadSettings();
        loadPatients();
    });

    const loadPatients = async () => {
        const result = await db.getAllAsync<Patient>('SELECT * FROM Patients');
        setPatients(result);
    };

    const clearForm = () => {
        setInputText('');
        setInputAddress('');
        setInputPhone('');
        setInputBirthDate('');
        setInputEmail('');
        setEditingId(null);
    };

    const savePatient = async () => {
        if (!inputText.trim()) {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }

        if (editingId) {
            await db.runAsync(
                'UPDATE Patients SET name = ?, address = ?, phone = ?, birth_date = ?, email = ? WHERE id = ?',
                [inputText.trim(), inputAddress.trim(), inputPhone.trim(), inputBirthDate.trim(), inputEmail.trim(), editingId]
            );
            Alert.alert('Éxito', 'Paciente actualizado correctamente');
        } else {
            await db.runAsync(
                'INSERT INTO Patients (name, address, phone, birth_date, email) VALUES (?, ?, ?, ?, ?)',
                [inputText.trim(), inputAddress.trim(), inputPhone.trim(), inputBirthDate.trim(), inputEmail.trim()]
            );
            Alert.alert('Éxito', 'Paciente agregado correctamente');
        }

        clearForm();
        loadPatients();
    };

    const startEdit = (patient: Patient) => {
        setInputText(patient.name);
        setInputAddress(patient.address ?? '');
        setInputPhone(patient.phone ?? '');
        setInputBirthDate(patient.birth_date ?? '');
        setInputEmail(patient.email ?? '');
        setEditingId(patient.id);
    };

    const deletePatient = async (id: number) => {
        await db.runAsync('DELETE FROM Patients WHERE id = ?', [id]);
        loadPatients();
        Alert.alert('Éxito', 'Paciente eliminado correctamente');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkModeEnabled ? '#1f2937' : '#eaeeff',
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
            color: darkModeEnabled ? '#fff' : '#005187',
            marginBottom: 16,
            textAlign: 'center',
        },
        form: {
            paddingHorizontal: 20,
            paddingTop: 50,
            gap: 8,
            marginBottom: 8,
        },
        input: {
            height: 50,
            borderColor: darkModeEnabled ? '#4b5563' : '#005187',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: darkModeEnabled ? '#374151' : '#fff',
            color: darkModeEnabled ? '#fff' : '#000',
        },
        counter: {
            textAlign: 'center',
            marginVertical: 10,
            fontSize: 16,
            fontWeight: '600',
            color: darkModeEnabled ? '#fff' : '#000',
        },
        patientCard: {
            padding: 10,
            marginHorizontal: 20,
            marginBottom: 10,
            backgroundColor: darkModeEnabled ? '#374151' : '#fff',
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: darkModeEnabled ? '#4b5563' : '#ccc',
        },
        patientName: {
            fontSize: 19,
            fontWeight: '600',
            margin: 6,
            color: darkModeEnabled ? '#fff' : '#000',
        },
        patientField: {
            fontSize: 14,
            color: darkModeEnabled ? '#d1d5db' : '#444',
            marginVertical: 2,
        },
        actionsGroup: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 8,
            marginTop: 8,
        },
    });

    const ListHeader = () => (
        <View style={styles.form}>
            <Text style={styles.title}>Gestión de Pacientes: {user?.username}</Text>
            <TextInput
                style={[styles.input, { borderWidth: isFocused ? 2 : 1 }]}
                placeholder="Nombre del paciente"
                placeholderTextColor={darkModeEnabled ? '#9ca3af' : '#999'}
                value={inputText}
                onChangeText={setInputText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                placeholderTextColor={darkModeEnabled ? '#9ca3af' : '#999'}
                value={inputAddress}
                onChangeText={setInputAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor={darkModeEnabled ? '#9ca3af' : '#999'}
                value={inputPhone}
                onChangeText={setInputPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                placeholderTextColor={darkModeEnabled ? '#9ca3af' : '#999'}
                value={inputBirthDate}
                onChangeText={setInputBirthDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={darkModeEnabled ? '#9ca3af' : '#999'}
                value={inputEmail}
                onChangeText={setInputEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <ButtonComponent
                text={editingId ? 'Actualizar paciente' : 'Agregar paciente'}
                onPress={savePatient}
            />
            {editingId && (
                <ButtonComponent text="Cancelar" type="danger" onPress={clearForm} />
            )}
            <Text style={styles.counter}>Pacientes registrados: {patients.length}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={ListHeader}
                renderItem={({ item }) => (
                    <View style={styles.patientCard}>
                        <Text style={styles.patientName}>{item.name}</Text>
                        <Text style={styles.patientField}> {item.address ?? 'Sin dirección'}</Text>
                        <Text style={styles.patientField}> {item.phone ?? 'Sin teléfono'}</Text>
                        <Text style={styles.patientField}> {item.birth_date ?? 'Sin fecha de nacimiento'}</Text>
                        <Text style={styles.patientField}> {item.email ?? 'Sin correo'}</Text>
                        <View style={styles.actionsGroup}>
                            <ButtonComponent text="Editar" type="edit" onPress={() => startEdit(item)} />
                            <ButtonComponent text="Eliminar" type="danger" onPress={() => deletePatient(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default PatientScreen;