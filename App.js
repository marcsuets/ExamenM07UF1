import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import CreateTask from './screens/CreateTask';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} options={{headerShown: false, animation: 'slide_from_right'}}/>
        <Stack.Screen name="CreateTask" component={CreateTask} options={{headerShown: false, animation: 'slide_from_right'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}