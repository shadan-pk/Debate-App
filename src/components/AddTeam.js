import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const AddTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/teams'); // Adjust API endpoint as needed
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/teams', { name: teamName }); // Adjust API endpoint as needed
      setTeams([...teams, response.data]);
      setTeamName('');
      setMessage(`Team "${response.data.name}" added successfully!`);
    } catch (error) {
      console.error('Error adding team:', error);
      setMessage('Error adding team. Please try again.');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`/teams/${teamId}`); // Adjust API endpoint as needed
      setTeams(teams.filter(team => team.id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div className="add-team">
      <h2>Add New Team</h2>
      <form onSubmit={handleAddTeam}>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Team</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Existing Teams</h3>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name}
            <button onClick={() => handleDeleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTeam;