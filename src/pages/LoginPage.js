import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Importing the useAuth hook
import axios from 'axios'; // Importing axios for making HTTP requests

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const { token, role } = response.data;
      login(token); // Assuming login function stores the token
      if (role === 'admin') {
        navigate('/admin'); // Redirect to admin page
      } else {
        navigate('/team-selection'); // Redirect to team selection page
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;