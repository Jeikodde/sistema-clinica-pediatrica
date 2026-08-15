import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido A La Clínica Pediátrica</Text>

            <View style={styles.buttonContainer} >
                <ButtonComponent text="Perfil" />
                <ButtonComponent text="Configuración" />
                <ButtonComponent text="Citas" />
                <ButtonComponent text="Historial Médico" />
                <ButtonComponent text="Cerrar sesión" type="danger" />
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