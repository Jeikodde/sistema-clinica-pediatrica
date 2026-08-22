import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const PatientProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneCard}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Perfil del Paciente</Text>

        <View style={styles.row}>
          <FontAwesome5 name="user" size={16} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Nombre: María Pérez</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="cake-variant" size={18} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Edad: 7 años</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="heart" size={18} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Condición: Asma</Text>
        </View>

        <Text style={styles.subtitle}>Información del Responsable</Text>

        <View style={styles.row}>
          <FontAwesome5 name="user" size={16} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Nombre: José Pérez</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call" size={18} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Teléfono: +503 7213 7890</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="account-child" size={18} color="#e07a5f" style={styles.icon} />
          <Text style={styles.rowText}>Relación: Padre</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbe9d0',
  },
  phoneCard: {
    width: '90%',
    maxWidth: 340,
    minHeight: 560,
    backgroundColor: '#fbe9d0',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#e07a5f',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#e07a5f',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e07a5f',
    marginTop: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  rowText: {
    fontSize: 13,
    color: '#333',
  },
});

export default PatientProfileScreen;