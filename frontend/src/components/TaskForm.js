import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const TaskForm = ({ addTask, currentTask, updateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { id: Date.now(), title, description };
    if (currentTask) {
      updateTask({ ...currentTask, title, description });
    } else {
      addTask(task);
    }
    setTitle('');
    setDescription('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="taskTitle">Task Title</Label>
        <Input
          type="text"
          id="taskTitle"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="taskDescription">Task Description</Label>
        <Input
          type="textarea"
          id="taskDescription"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" color="primary">{currentTask ? 'Update Task' : 'Add Task'}</Button>
    </Form>
  );
};

export default TaskForm;
