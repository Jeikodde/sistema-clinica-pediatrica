import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { UserContext, useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginScreenNavigationProp } from "../context/NavigationScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigation = useNavigation<LoginScreenNavigationProp>();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');

            if(token) {
                navigateToMain();
            }
        }

        checkToken();
    }, []);

    const navigateToMain = () => {
        navigation.replace('Main', {
            screen: 'Tabs', 
            params: {
                screen: 'Home'
            }
        });
    }

    const handleLogin = async () => {
        if(!username || !password) {
            alert('Complete fields')
            return;
        }

        await AsyncStorage.setItem('user', username);
        await AsyncStorage.setItem('token', 'fake-token-123456');

        // setUser({ username });

        navigateToMain();
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