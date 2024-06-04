import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom
import MovieList from './Movies';

function TextControlsExample() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Secure password comparison (avoid storing passwords in plain text)
    const isValid = username === 'Admin' && validatePassword(password); // Replace with secure password validation

if (isValid) {
      setErrorMessage('');
      localStorage.setItem('isLoggedIn', true);
      navigate('/MovieList'); 
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const validatePassword = (plainTextPassword) => {
    
    return plainTextPassword === 'Password';
  };

  return (
    <Container className="bg-warning d-flex justify-content-center align-items-center vh-100">
      <Form className="p-3 mb-2 bg-secondary text-white" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <FormControl
            type={password ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
          <Form.Check
            type="checkbox"
            label="Show password"
            checked={password}
            onChange={() => setPassword(!password)} // Toggle password visibility
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </Form>
    </Container>
  );
}

export default TextControlsExample;
