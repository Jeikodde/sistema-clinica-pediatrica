import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';

interface MedicalRecord {
  id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

const medicalRecords: MedicalRecord[] = [
  {
    id: 1,
    date: '2024-08-01',
    diagnosis: 'Fiebre',
    treatment: 'Paracetamol',
    notes: 'Revisión en una semana',
  },
  {
    id: 2,
    date: '2024-07-15',
    diagnosis: 'Gripe',
    treatment: 'Reposo e hidratación',
    notes: 'Tomar líquidos abundantes',
  },
  {
    id: 3,
    date: '2024-06-10',
    diagnosis: 'Alergia',
    treatment: 'Antihistamínicos',
    notes: 'Evitar alérgenos conocidos',
  },
];

const MedicalHistoryScreen =() => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.phoneCard}>
        <Text style={styles.title}>Historial Clínico: { user?.username }</Text>

        <ScrollView style={styles.listContainer}>
          {medicalRecords.map((record) => (
            <View key={record.id} style={styles.card}>
              <Text style={styles.dateText}>{record.date}</Text>
              <Text style={styles.rowText}>
                <Text style={[styles.label, styles.diagnosisColor]}>Diagnóstico: </Text>
                {record.diagnosis}
              </Text>
              <Text style={styles.rowText}>
                <Text style={[styles.label, styles.treatmentColor]}>Tratamiento: </Text>
                {record.treatment}
              </Text>
              <Text style={styles.rowText}>
                <Text style={[styles.label, styles.notesColor]}>Notas: </Text>
                {record.notes}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  phoneCard: {
    width: '90%',
    maxWidth: 340,
    height: '85%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '800',
    color: '#0d1b4c',
  },
  listContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d1b4c',
    marginBottom: 6,
  },
  rowText: {
    fontSize: 13,
    color: '#333',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  diagnosisColor: {
    color: '#c0392b',
  },
  treatmentColor: {
    color: '#27ae60',
  },
  notesColor: {
    color: '#2980b9',
  },
});

export default MedicalHistoryScreen;