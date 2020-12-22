import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { getToken } from '../utils/common';

const fetchSvgData = (props) => {
  const url = "http://localhost:3001/generate_qrcode";
  const authorize = "Bearer " + getToken();
  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": authorize
  });
  const [result, setResult] = useState("");
  fetch(url, {
    method: "get",
    headers
  })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok");
    })
    .then(response => {
      setResult(response.svg_file);
    })
    .catch(() => alert("Cannot load qrcode"));
  return result;
}

function QrcodeSvg (props) {
  return (
    fetchSvgData()
  )
}

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [otpCodeToken, setToken] = useState("");
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Use the authentication app like Google Authenticator to verify</Form.Label>
        <div dangerouslySetInnerHTML={{ __html: QrcodeSvg() }} />
      </Form.Group>

      <Form.Group controlId="formBasicToken">
        <Form.Label>OTP Token</Form.Label>
        <Form.Control
          type="text"
          placeholder="Input the otp token"
          value={otpCodeToken}
          onChange={(e) => setToken(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default function App(props) {
  if(!getToken()) props.history.push("/");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const enableTfa = (token, props) => {
    const url = "http://localhost:3001/enable_tfa";
    const authorize = "Bearer " + getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": authorize
    });
    fetch(url, {method: "POST", headers, body: JSON.stringify({otp_code_token: token})})
        .then(response => {
          if(response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok");
        })
        .then(response => {
          if (response.status_code == 200) {
            alert(response.message);
            // handleClose();
            location.href = "/";
          }else {
            setError(response.message);
          }
        })
        .catch(error => {
          setError("Something went wrong!");
        });
  }

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    enableTfa(e.target.elements.formBasicToken.value);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <Button variant="primary" onClick={handleShow}>
            Enable Two-factor Authentication
          </Button>
          <Link to="/" className="btn d-block mt-2">
            Home
          </Link>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Two-fator Authentication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} />
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
