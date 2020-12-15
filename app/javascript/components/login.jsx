import React, { useState } from 'react';
import { setUserSession } from '../utils/common.js';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    const url = "http://localhost:3001/login";
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    setError(null);
    setLoading(true);
    fetch(url, {method: "POST", headers, body: JSON.stringify({username: username.value, password: password.value})})
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(response => {
        setLoading(false);
        setUserSession(response.token, response.user);
        props.history.push('/');
      })
      .catch(error => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div>
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
    </div>
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
