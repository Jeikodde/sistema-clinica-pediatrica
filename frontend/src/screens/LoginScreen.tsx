import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const LoginScreen = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log({ user, password });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicar Sesión</Text>

            <TextInput 
                style={styles.input}
                placeholder="Usuario"
                value={user}
                onChangeText={setUser}
            />

            <TextInput 
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Inicar sesión</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        marginVertical: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%'
    },

    button: {
        backgroundColor: '#9b2fb9',
        padding: 10,
        borderRadius: 5,
        width: '80%'
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff'
    }
});

export default LoginScreen;