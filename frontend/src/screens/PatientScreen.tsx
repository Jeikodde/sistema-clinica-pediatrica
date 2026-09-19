import { useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Patient {
    id: string;
    name: string;
}

const PatientScreen = () => {
    const { user } = useUser();

    const [inputText, setInputText] = useState<string>('');
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
    
    useEffect( () => {
        const loadSettings = async () => {
            const darkMode = await AsyncStorage.getItem('darkMode');

            if(darkMode) {
                setDarkModeEnabled(!!darkMode);
            }
        }

        loadSettings();
    });

    const addPatient = () => {
        const newPatient: Patient = {
            id: uuid.v4(),
            name: inputText
        }

        setPatients([...patients, newPatient]);
    }

    const startEdit = (patient: Patient) => {
        setInputText(patient.name);
        setEditingId(patient.id);
    }

    const savePatient = () => {
        if(!inputText.trim()) {
            return;
        }

        setInputText('');

        if(editingId) {
            editPatient();
            return;
        } 

        addPatient();

    }

    const editPatient = () => {
        setPatients((prev) => 
            prev.map(patient => (patient.id === patient.id) ? { ...patient, name: patient.name } : patient)
        );
    }

    const deletePatient = (id: string) => {
        setPatients((prev) => prev.filter(patient => patient.id !== id));
    }

    const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: darkModeEnabled ? '#1f2937' : '#eaeeff'
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        color: darkModeEnabled ? '#fff' : '#005187',
        marginBottom: 20,
    },

    form: {
        width: '80%',
        gap: 8,
        marginBottom: 8,
    },

    input: {
        height: 50,
        borderColor: darkModeEnabled ? '#4b5563' : '#005187',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        backgroundColor: darkModeEnabled ? '#374151' : '#fff',
        color: darkModeEnabled ? '#fff' : '#000'
    },

    counter: {
        margin: 15,
        fontSize: 16,
        fontWeight: '600',
        color: darkModeEnabled ? '#fff' : '#000'
    },

    patientList: {
        padding: 10,
        margin: 10,
        backgroundColor: darkModeEnabled ? '#374151' : '#fff',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: darkModeEnabled ? '#4b5563' : '#ccc'
    },

    patientValue: {
        fontSize: 19,
        margin: 10,
        flexWrap: 'wrap',
        color: darkModeEnabled ? '#fff' : '#000'
    },

    actionsGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 8,
    },
});

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Pacientes: { user?.username }</Text>

            <View style={styles.form}>
                <TextInput
                    style={[
                        styles.input, {
                            borderWidth: isFocused ? 2 : 1
                        }
                    ]} 
                    placeholder="Nombre del paciente"
                    value={inputText}
                    onChangeText={setInputText}
                    onFocus={ () => setIsFocused(true) }
                    onBlur={ () => setIsFocused(false) }
                />

                <ButtonComponent text="Agregar paciente" onPress={savePatient} />
            </View>

            <Text style={styles.counter}>Pacientes registrados: { patients.length }</Text>

            <View style={{width: '100%'}}>
                <FlatList 
                data={patients}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ alignItems: 'stretch' }}
                renderItem={({item}) => (
                    <View style={styles.patientList}>
                        <Text style={styles.patientValue}>{item.name}</Text>

                        <View style={styles.actionsGroup}>

                            <ButtonComponent text="Editar" type="edit" onPress={ () => startEdit(item) } />
                            <ButtonComponent text="Eliminar" type="danger" onPress={ () => deletePatient(item.id) } />
                        </View>
                    </View>
                )}
            />
            </View>
        </View>
    )
};

export default PatientScreen;