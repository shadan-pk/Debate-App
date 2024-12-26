import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">

      <main>
        <section className="welcome-section">
          <h1>Welcome to the Debate App</h1>
          <p>Your platform for engaging, thoughtful, and structured debates.</p>
          <div className="action-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/debates" className="btn">View Debates</Link>
            <Link to="/team-selection" className="btn">Select Team</Link>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HomePage;