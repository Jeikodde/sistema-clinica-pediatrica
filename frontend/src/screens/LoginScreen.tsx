import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { RootStackParamList, UserContext, useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = () => {
        if(!username || !password) {
            alert('Complete fields')
            return;
        }

        setUser({ username });
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/icon.png')}/>
            <Text style={styles.title}>Inicar Sesión</Text>

            <TextInput 
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput 
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{width: '80%'}}>
                <ButtonComponent text="Iniciar sesión" onPress={handleLogin} />
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