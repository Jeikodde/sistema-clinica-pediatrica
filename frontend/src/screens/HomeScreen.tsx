import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "./LoginScreen";

const HomeScreen = () => {
    const { user } = useUser();

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const goToPatientScreen = () => {
        navigation.navigate('Patient');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido { user?.username }, A La Clínica Pediátrica</Text>

            <View style={styles.buttonContainer} >
                <MaterialCommunityIcons name="account" size={24} color={'#fff'} />
                <ButtonComponent text="Perfil" IconComponent={MaterialCommunityIcons} iconName="account" />
                <ButtonComponent text="Gestión de pacientes"  IconComponent={MaterialCommunityIcons} iconName="account-supervisor" onPress={goToPatientScreen} />
                <ButtonComponent text="Configuración"  IconComponent={MaterialCommunityIcons} iconName="cog-box" />
                <ButtonComponent text="Citas"  IconComponent={MaterialCommunityIcons} iconName="list-box" />
                <ButtonComponent text="Historial Médico"  IconComponent={MaterialCommunityIcons} iconName="list-status" />
                <ButtonComponent text="Cerrar sesión"  IconComponent={MaterialCommunityIcons} iconName="logout" type="danger" />
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