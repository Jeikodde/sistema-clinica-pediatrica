import { useContext, useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { UserContext, useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginScreenNavigationProp } from "../context/NavigationScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.89:5000' : 'http://localhost:5000';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const token = await AsyncStorage.getItem('token');
            const darkMode = await AsyncStorage.getItem('darkMode');

            if(token) {
                navigateToMain();
            }

            if(darkMode) {
                setDarkModeEnabled(!!darkMode);
            }
        }

        loadSettings();
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

        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, {
                name: username.trim(),
                password: password
            });

            const { token } = res.data;
            
            if(token) {
                alert('Login successful');
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', username);
                setLoading(false);
                navigateToMain();
                return;
            }

            setLoading(false);
            setError('Invalid credentials');
            alert('Invalid credentials');
        } catch(error) {
            setLoading(false);
            setError('An error occurred while logging in');
            alert(`An error occurred while logging in`);
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkModeEnabled ? '#1f2937' : '#fff',
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
            color: darkModeEnabled ? '#fff' : '#1f2937',
        },

        input: {
            color: darkModeEnabled ? '#fff' : '#1f2937',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: '80%',
        },
    });

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/icon.png')}/>
            <Text style={styles.title}>Inicar Sesión</Text>

            <TextInput 
                style={styles.input}
                placeholderTextColor={ darkModeEnabled ? '#969494' : '#1f2937' }
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput 
                style={styles.input}
                placeholderTextColor={ darkModeEnabled ? '#969494' : '#1f2937' }
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{width: '80%', gap: 10}} >
                <ButtonComponent text="Iniciar sesión" onPress={handleLogin} />
                <ButtonComponent text="Registrarse" onPress={() => navigation.navigate('Register')} />
                    <Text style={{color: 'red'}}>{error}</Text>
            </View>
        </View>
    )
}

export default LoginScreen;