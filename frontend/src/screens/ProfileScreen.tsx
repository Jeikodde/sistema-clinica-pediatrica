import { StyleSheet, Text, View } from "react-native"
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const { user } = useUser();
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: darkModeEnabled ? '#1f2937' : '#fff',
            padding: 24,
            paddingTop: 70
        },

        avatar: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            marginBottom: 16,
            borderRadius: 50,
            backgroundColor: '#2563eb'
        },

        avatarText: {
            color: '#ffffff',
            fontSize: 32,
            fontWeight: '700'
        },

        name: {
            color: '#1f2937',
            fontSize: 24,
            fontWeight: '700'
        },

        email: {
            marginTop: 4,
            marginBottom: 28,
            color: '#6b7280',
            fontSize: 15
        },

        infoCard: {
            width: '100%',
            marginBottom: 12,
            padding: 16,
            borderRadius: 12,
            backgroundColor: darkModeEnabled ? '#7ea1d3' : '#fff',
        },

        label: {
            marginBottom: 4,
            color: darkModeEnabled ? '#fff' : '#6b7280',
            fontSize: 13
        },

        value: {
            color: darkModeEnabled ? '#fff' : '#6b7280',
            fontSize: 16,
            fontWeight: '600'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
            </View>

            <Text style={styles.name}>{ user?.username }</Text>
            <Text style={styles.email}>john@example.com</Text>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Especialidad</Text>
                <Text style={styles.value}>Pediatría</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Teléfono</Text>
                <Text style={styles.value}>+503 7123-4567</Text>
            </View>
        </View>
    )
};

export default ProfileScreen;