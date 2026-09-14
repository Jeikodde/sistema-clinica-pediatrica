import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
    const { user } = useUser();

    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);

    useEffect( () => {
        const loadSettings = async () => {
            const darkMode = await AsyncStorage.getItem('darkMode');

            if(darkMode) {
                setDarkModeEnabled(!!darkMode);
            }
        }

        loadSettings();
    });

    const toggleDarkMode = (value: boolean) => {
        setDarkModeEnabled(value);
    }

    // Styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkModeEnabled ? '#1f2937' : '#f5f7fa',
            padding: 34,
            paddingTop: 70
        },

        title: {
            marginBottom: 28,
            color: darkModeEnabled ? '#fff' : '#1f2937',
            fontSize: 28,
            fontWeight: '700'
        },

        section: {
            marginBottom: 20,
            overflow: 'hidden',
            borderRadius: 12,
            backgroundColor: darkModeEnabled ? '#3a3c44' :  '#fff'
        },

        sectionTitle: {
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
            color: darkModeEnabled ? '#fff' : '#6b7280',
            fontSize: 13,
            fontWeight: '700',
            textTransform: 'uppercase'
        },

        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: darkModeEnabled ? '#1e1e1e' : '#e5e7eb'
        },

        option: {
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: darkModeEnabled ? '#1e1e1e' : '#e5e7eb'
        },

        optionTitle: {
            color: darkModeEnabled ? '#e5e7eb' : '#1f2937',
            fontSize: 16,
            fontWeight: '600'
        },

        optionDescription: {
            maxWidth: 250,
            marginTop: 3,
            color: darkModeEnabled ? '#fff' : '#6b7280',
            fontSize: 13
        },

        logoutText: {
            color: '#dc2626',
            fontSize: 16,
            fontWeight: '600'
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración: { user?.username }</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferencias</Text>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.optionTitle}>Notificaciones</Text>
                        <Text style={styles.optionDescription}>Recibir recordatorios y novedades.</Text>
                    </View>

                    <Switch 
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.optionTitle}>Modo oscuro</Text>
                        <Text style={styles.optionDescription}>Activar tema oscuro en la aplicación</Text>
                    </View>

                    <Switch 
                        value={darkModeEnabled}
                        onValueChange={ () => toggleDarkMode(!darkModeEnabled) }
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cuenta</Text>

                <View style={styles.option}>
                    <Text style={styles.optionTitle}>Cambiar contraseña</Text>
                </View>

                <View style={styles.option}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </View>
            </View>
        </View>
    )
}

export default SettingsScreen;