import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { setUserSession } from '../utils/common.js';
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [otpCodeToken, setToken] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle button click of login form
  const handleLogin = () => {
    const url = "http://localhost:3001/login";
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    setError(null);
    setLoading(true);
    fetch(url, {method: "POST", headers,
      body: JSON.stringify({username: username.value, password: password.value, otp_code_token: otpCodeToken})})
      .then(response => {
        if(response.ok || response.status == 401) {
          return response.json();
        }
        throw new Error("Something Wrong!");
      })
      .then(response => {
        setLoading(false);
        if(response.status_code == 4) {
          handleShow();
          setError(response.message);
        } else if(response.is_enable_tfa) {
          setUserSession(response.token, response.user);
          props.history.push('/enable_tfa');
        } else if(response.status_code == 1) {
          setError(response.message);
        } else {
          setUserSession(response.token, response.user);
          props.history.push('/');
        }
      })
      .catch(error => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
  }

  const LoginForm = ({ onSubmit }) => {
    return (
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicToken">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the otp token"
            value={otpCodeToken}
            onChange={(e) => {setToken(e.target.value); e.stopPropagation();}}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Login
        </Button>
      </Form>
    );
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    setToken(e.target.elements.formBasicToken.value);
    handleLogin();
  };

  return (
    <>
    <div className="vw-100 vh-100 primary-color ml-5">
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      <Link to="/" className="btn btn-link">
        Home
      </Link>
    </div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Verify OTP Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm onSubmit={onLoginFormSubmit} />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
      </Modal.Body>
    </Modal>
    </>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;
