import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Asegúrate de importar la configuración de Firebase
import colors from '../colors';

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Esta función obtiene las tareas de Firebase
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'taskList'));  // La colección 'tasks' en Firestore
      const fetchedTasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  // Cargar tareas al inicio
  useEffect(() => {
    fetchTasks();
  }, []);

  // Actualizar el estado de 'completed' en Firestore
  const toggleCompletion = async (id, completed) => {
    try {
      const taskRef = doc(db, 'taskList', id);
      await updateDoc(taskRef, { completed: !completed });
      fetchTasks();  // Recargar tareas después de la actualización
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // Eliminar tarea de Firestore
  const deleteTask = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'taskList', id));  // Elimina la tarea de Firebase
            fetchTasks();  // Recargar tareas después de la eliminación
          } catch (error) {
            console.error("Error deleting task: ", error);
          }
        },
      },
    ]);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleCompletion(item.id, item.completed)}
        style={styles.checkbox}
      />
      <Text
        style={[styles.taskText, item.completed ? styles.completedText : null]}
      >
        {item.deadline ? `${item.title} - ${formatDate(item.deadline)}` : item.title}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Agregar 0 si el día es menor a 10
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Los meses empiezan desde 0, por eso sumamos 1
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;  // Retornar la fecha en formato DD-MM-YYYY
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TO DO LIST</Text>
      </View>
      <View style={{flex: 5, paddingTop: 30}}>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTask', { setTasks })}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>        
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: colors.main 
  },
  taskContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    borderBottomColor: colors.secondary, 
    borderBottomWidth: 1, 
  },
  checkbox: { 
    marginRight: 10 
  },
  taskText: { 
    fontSize: 16 
  },
  completedText: {
    textDecorationLine: 'line-through', 
    color: 'gray' 
  },
  deleteButton: { 
    marginLeft: 'auto',
    marginRight: 7, 
    marginBottom: 3,
    backgroundColor: colors.danger, 
    padding: 5, 
    borderRadius: 5, 
    width: 25,
  },
  deleteText: { 
    color: 'white', 
    textAlign: 'center'
  },
  addButton: { 
    backgroundColor: colors.secondary, 
    padding: 10, 
    alignItems: 'center', 
    marginTop: 20, 
    borderRadius: 5 
  },
  addButtonText: { 
    color: 'white', 
    fontSize: 16 
  },
});