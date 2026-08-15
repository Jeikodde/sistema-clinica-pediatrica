import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const LoginScreen = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log({ user, password });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/icon.png')}/>
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

            <View style={{width: '80%'}}>
                <ButtonComponent text="Agregar paciente" onPress={handleLogin} />
            </View>
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

    logo: {
        width: 120,
        height: 120,
        borderRadius: 100,
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
});

export default LoginScreen;