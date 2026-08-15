import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido A La Clínica Pediátrica</Text>

            <View style={styles.buttonContainer} >
                <Button title="Profile"/>
                <Button title="Settings"/>  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333'
    },

    buttonContainer: {
        gap: 8
    }
})

export default HomeScreen;