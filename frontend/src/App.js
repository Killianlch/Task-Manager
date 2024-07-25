import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      // Simulate fetching tasks from a server
      setTasks([{ id: 1, title: 'Sample Task', description: 'This is a sample task description.' }]);
    }
  }, [user]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    toast.success('Task added successfully');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info('Task deleted');
  };

  const editTask = (task) => {
    setCurrentTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setCurrentTask(null);
    toast.success('Task updated successfully');
  };

  const login = (credentials) => {
    // Simulate a successful login
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setUser({ username: 'admin', token: 'fake-jwt-token' });
      toast.success('Logged in successfully');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    toast.info('Logged out successfully');
  };

  return (
    <Container>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Task Manager</NavbarBrand>
        {user && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="secondary" onClick={logout}>Logout</Button>
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <div className="mt-4">
        <ToastContainer />
        {!user ? (
          <Login login={login} />
        ) : (
          <div>
            <TaskForm
              addTask={addTask}
              currentTask={currentTask}
              updateTask={updateTask}
            />
            <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
