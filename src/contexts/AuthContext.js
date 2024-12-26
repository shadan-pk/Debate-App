import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async ({ username, password }) => {
    const response = await axios.post('/api/login', { username, password });
    setAuth(response.data.token);
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};