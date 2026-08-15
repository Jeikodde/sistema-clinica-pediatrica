import { StyleSheet, Text, View } from "react-native"

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
            </View>

            <Text style={styles.name}>John Doe</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
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
        backgroundColor: '#ffffff'
    },

    label: {
        marginBottom: 4,
        color: '#6b7280',
        fontSize: 13
    },

    value: {
        color: '#1f2937',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default ProfileScreen;