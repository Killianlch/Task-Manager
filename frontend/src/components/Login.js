import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">Login</Button>
    </Form>
  );
};

export default Login;
