import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls
import PropTypes from 'prop-types';

const AddTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
    // Optionally, you can set up polling or WebSocket listeners here for real-time updates
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/teams'); // Adjust API endpoint as needed
      setTeams(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to fetch teams. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('Team name cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/teams', { name: teamName.trim() }); // Adjust API endpoint as needed
      setTeams((prevTeams) => [...prevTeams, response.data]);
      setTeamName('');
      setMessage(`Team "${response.data.name}" added successfully!`);
      setError('');
    } catch (err) {
      console.error('Error adding team:', err);
      setError('Error adding team. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;
    setLoading(true);
    try {
      await axios.delete(`/teams/${teamId}`); // Adjust API endpoint as needed
      setTeams((prevTeams) => prevTeams.filter(team => team.id !== teamId));
      setMessage('Team deleted successfully.');
      setError('');
    } catch (err) {
      console.error('Error deleting team:', err);
      setError('Error deleting team. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-team">
      <h2>Add New Team</h2>
      <form onSubmit={handleAddTeam}>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Team'}
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <h3>Existing Teams</h3>
      {loading && <p>Loading teams...</p>}
      {!loading && teams.length === 0 && <p>No teams available.</p>}
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name}
            <button
              onClick={() => handleDeleteTeam(team.id)}
              disabled={loading}
              aria-label={`Delete team ${team.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

AddTeam.propTypes = {
  // Define prop types if you plan to pass props in the future
};

export default AddTeam;
