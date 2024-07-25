// mobile/components/TaskList.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.185:5001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://192.168.1.185:5001/tasks/${currentTask._id}`, { title: newTitle, description: newDescription });
      fetchTasks();
      setIsEditing(false);
      setCurrentTask(null);
      setNewTitle('');
      setNewDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
            <Button title="Edit" onPress={() => handleEdit(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default TaskList;