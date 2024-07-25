// mobile/App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskForm />
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
