import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";

const BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.89:5000' : 'http://localhost:5000';

const RegisterScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleRegister = async () => {
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, {
                name: username,
                password,
                role: 'user'
            });
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Error al registrar el usuario');
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <ButtonComponent text="Registrarse" onPress={handleRegister} />
                <ButtonComponent text="Volver al login" type="edit" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#eaeeff',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#005187',
        marginBottom: 24,
    },
    form: {
        width: '80%',
        gap: 12,
    },
    input: {
        height: 50,
        borderColor: '#005187',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
});

export default RegisterScreen;