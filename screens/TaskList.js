import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../colors';

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Comprar menjar', deadline: '2024-11-20', completed: false },
  { id: '2', title: 'Netejar la casa', deadline: null, completed: false },
  { id: '3', title: 'Passejar el gos', deadline: '2024-11-21', completed: true },
  { id: '4', title: 'Fer exercici', deadline: '2024-11-22', completed: false },
  { id: '5', title: 'Preparar el sopar', deadline: '2024-11-20', completed: true },
  { id: '6', title: 'Revisar documents', deadline: '2024-11-24', completed: false },
  { id: '7', title: 'Comprar un regal', deadline: null, completed: false },
  { id: '8', title: 'Anar al metge', deadline: '2024-11-23', completed: true },
  { id: '9', title: 'Llevar-me d’hora', deadline: '2024-11-21', completed: false },
  { id: '10', title: 'Comprar llibres', deadline: null, completed: false },
  { id: '11', title: 'Visitar un amic', deadline: null, completed: false },
  { id: '12', title: 'Netejar el cotxe', deadline: '2024-11-26', completed: false },
  { id: '13', title: 'Practicar un instrument', deadline: null, completed: false },
  { id: '14', title: 'Pagar factures', deadline: '2024-11-30', completed: false },
  { id: '15', title: 'Organitzar escriptori', deadline: null, completed: false },
  { id: '16', title: 'Fer la compra online', deadline: '2024-11-25', completed: false } 
  ]);

  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
      },
    ]);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleCompletion(item.id)}
        style={styles.checkbox}
      />
      <Text
        style={[
          styles.taskText,
          item.completed ? styles.completedText : null,
        ]}
      >
        {item.deadline ? `${item.title} - ${item.deadline}` : item.title}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

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
