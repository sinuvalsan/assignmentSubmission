import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/userProvider";

const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        user.setJwt(headers.get("authorization"));
        navigate("/dashboard");
      })
      .catch((message) => {
        alert(message);
      });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  return (
    <>
      <Container className="mt-5 d-flex align-items-center justify-content-center">
        <Form onSubmit={onFormSubmit}>
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
          <Button id="submit" type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
