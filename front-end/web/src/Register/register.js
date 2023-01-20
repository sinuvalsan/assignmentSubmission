import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpRequest from "../Services/httpServices";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function registerUser() {
    const reqBody = {
      name: name,
      username: username,
      password: password,
    };
    fetch("api/users/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 226)
          return Promise.reject("User already exists");
        else return Promise.all([response.text(), response.headers]);
      })
      .catch((message) => {
        alert(message);
      });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <>
      <Container className="mt-5 d-flex align-items-center justify-content-center">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div>
            <Button
              id="register"
              type="submit"
              variant="primary"
              className="login-button mb-2"
            >
              Register
            </Button>
          </div>
          <div>
            <Button
              id="back"
              type="button"
              variant="secondary"
              className="login-button"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
