import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebaseConfig';  // Importa la configuración de Firebase
import { addDoc, collection, getDocs } from 'firebase/firestore';
import colors from '../colors';

export default function CreateTask({ navigation, route }) {
  const { setTasks } = route.params; // Para añadir tareas en TaskList
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert('The task title cannot be empty.');
      return;
    }

    try {
      // Agregar la nueva tarea a Firebase
      await addDoc(collection(db, 'taskList'), {
        title,
        deadline: deadline || null,
        completed: false,
      });

      // Obtener las tareas actualizadas desde Firebase
      const querySnapshot = await getDocs(collection(db, 'taskList'));
      const fetchedTasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Actualizar las tareas en TaskList
      setTasks(fetchedTasks); // Actualizar el estado de las tareas en la pantalla TaskList

      // Regresar a TaskList después de agregar la tarea
      navigation.goBack();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDeadline(formattedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add New Task</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Deadline (Optional)</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateButtonText}>
            {deadline ? `Selected Date: ${deadline}` : 'Select Date'}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onDateChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.main
  },
  header: {
    backgroundColor: colors.secondary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,    
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
