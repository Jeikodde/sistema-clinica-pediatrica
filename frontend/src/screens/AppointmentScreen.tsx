import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

interface Appointment {
  id: number;
  date: string;
  time: string;
  patient: string;
  reason: string;
}

type AppointmentFormData = Omit<Appointment, 'id'>;

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: '2024-08-01',
      time: '10:00 AM',
      patient: 'Juan Pérez',
      reason: 'General checkup',
    },
    {
      id: 2,
      date: '2024-08-03',
      time: '11:00 AM',
      patient: 'Ana García',
      reason: 'Follow-up consultation',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<AppointmentFormData>({
    date: '',
    time: '',
    patient: '',
    reason: '',
  });

  const handleChange = (field: keyof AppointmentFormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (): void => {
    if (!formData.date || !formData.time || !formData.patient || !formData.reason) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      ...formData,
    };

    setAppointments((prev) => [...prev, newAppointment]);
    setFormData({ date: '', time: '', patient: '', reason: '' });
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setFormData({ date: '', time: '', patient: '', reason: '' });
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.phoneCard}>
        <Text style={styles.title}>Scheduled Appointments</Text>

        <ScrollView style={styles.listContainer}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Date: </Text>{appointment.date}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Time: </Text>{appointment.time}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Patient: </Text>{appointment.patient}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Reason: </Text>{appointment.reason}
              </Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.mainButton} onPress={() => setIsModalOpen(true)}>
          <Text style={styles.mainButtonText}>New Appointment</Text>
        </TouchableOpacity>

        <Modal visible={isModalOpen} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Appointment</Text>

              <TextInput
                style={styles.input}
                placeholder="Date (YYYY-MM-DD)"
                value={formData.date}
                onChangeText={(text) => handleChange('date', text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Time (HH:MM AM/PM)"
                value={formData.time}
                onChangeText={(text) => handleChange('time', text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Patient"
                value={formData.patient}
                onChangeText={(text) => handleChange('patient', text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Reason"
                value={formData.reason}
                onChangeText={(text) => handleChange('reason', text)}
              />

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
                  <Text style={styles.actionButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    justifyContent: 'space-between',
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
    color: '#111',
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
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
  cardText: {
    marginVertical: 2,
    fontSize: 13,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  mainButton: {
    backgroundColor: '#5a00e0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 6,
    color: '#333',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#5a00e0',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AppointmentsScreen;