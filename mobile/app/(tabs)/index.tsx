// mobile/app/tabs/index.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import axios from 'axios';

export default function Index() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://192.168.1.185:5001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
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