import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../context/NavigationScreens";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    const { user } = useUser();

    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [username, setUsername] = useState('');

    useEffect( () => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');

            if(storedUser) {
                setUsername(storedUser );
            }
        }

        loadUser();
    }, []);

    // const navigateTo = (path: keyof RootStackParamList) => {
    //      navigation.navigate(path);
    // }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');

        navigation.reset({ index: 0, routes: [{name: 'Login'}]})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido { username }, A La Clínica Pediátrica</Text>

            <View style={styles.buttonContainer} >
                <MaterialCommunityIcons name="account" size={24} color={'#fff'} />
                <ButtonComponent text="Perfil" IconComponent={MaterialCommunityIcons} iconName="account" onPress={() => navigation.navigate('Profile')} />
                <ButtonComponent text="Patients" IconComponent={ MaterialCommunityIcons} iconName="medical-bag" onPress={() => navigation.navigate('Patients', {
                    screen: 'PatientList'
                })} />
                <ButtonComponent text="Ayuda"  IconComponent={MaterialCommunityIcons} iconName="help" onPress={ () => navigation.navigate('Help') } />

                <ButtonComponent text="Cerrar sesión" IconComponent={MaterialCommunityIcons} iconName="logout" type="danger" onPress={ handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        color: '#005187',
        textAlign: 'center'
    },

    buttonContainer: {
        width: '80%',
        gap: 8
    }
})

export default HomeScreen;