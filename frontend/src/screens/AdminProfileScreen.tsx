import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneCard}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3870/3870822.png' }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Perfil del Administrador</Text>

        <View style={styles.row}>
          <Ionicons name="person" size={18} color="#2d6cdf" style={styles.icon} />
          <Text style={styles.rowText}>Nombre: Lito López</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="briefcase" size={18} color="#2d6cdf" style={styles.icon} />
          <Text style={styles.rowText}>Rol: Administrador</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail" size={18} color="#2d6cdf" style={styles.icon} />
          <Text style={styles.rowText}>Correo: lito.lopez@clinica.com</Text>
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
    backgroundColor: '#dfe9f5',
  },
  phoneCard: {
    width: '90%',
    maxWidth: 340,
    minHeight: 480,
    backgroundColor: '#dfe9f5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2d6cdf',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2d6cdf',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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

export default AdminProfileScreen