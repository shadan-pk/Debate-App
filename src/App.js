import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { DebateProvider } from './contexts/DebateContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DebatePage from './pages/DebatePage';
import TeamSelectionPage from './pages/TeamSelectionPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DebateProvider>
          <Header />
          <div className="app">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/debate" element={<DebatePage />} />
              <Route path="/team-selection" element={<TeamSelectionPage />} />
            </Routes>
          </div>
          <Footer />
        </DebateProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;