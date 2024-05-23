import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/authenticate/login', { username, password });
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        setMessage('Login successful');
        // Store the token and redirect to settings or protected route
        localStorage.setItem('token', response.data.accessToken);
        // You can navigate to a protected route here, e.g., settings page
        window.location.href = '/setting';
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error logging in');
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
