import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/authenticate', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating user');
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h3>Sign Up</h3>
      <form onSubmit={handleSignUp} className="sign-up-form">
        <div className="sign-up-form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="sign-up-form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SignUp;
