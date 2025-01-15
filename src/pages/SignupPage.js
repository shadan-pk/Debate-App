import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'red' };
      case 2:
        return { label: 'Moderate', color: 'orange' };
      case 3:
        return { label: 'Strong', color: 'blue' };
      case 4:
        return { label: 'Very Strong', color: 'green' };
      default:
        return { label: '', color: '' };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic front-end validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (passwordStrength.label === 'Weak') {
      setError('Please choose a stronger password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/signup', {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      setSuccess('User registered successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Signup</h1>
      {success && <div style={styles.success}>{success}</div>}
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your password"
          />
          {formData.password && (
            <div style={{ color: passwordStrength.color }}>
              Password Strength: {passwordStrength.label}
            </div>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Re-enter your password"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="role" style={styles.label}>Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
