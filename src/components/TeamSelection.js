import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api'; // Ensure this service is set up for API calls
import { AuthContext } from '../contexts/AuthContext';
import { DebateContext } from '../contexts/DebateContext';

const TeamSelection = () => {
  const { user } = useContext(AuthContext);
  const { setTeams } = useContext(DebateContext);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTeamSelect = async (team) => {
    setSelectedTeam(team);
    setError('');

    try {
      const response = await axios.post('/select-team', { userId: user.id, team }); // Adjust API endpoint as needed
      setTeams(response.data.teams);
      navigate('/debate'); // Navigate to the debate page after successful selection
    } catch (error) {
      console.error('Error selecting team:', error);
      setError('Error selecting team. Please try again.');
    }
  };

  return (
    <div className="team-selection">
      <h2>Select Your Team</h2>
      <div className="teams">
        <button
          className={`team-button ${selectedTeam === 'teamA' ? 'selected' : ''}`}
          onClick={() => handleTeamSelect('teamA')}
        >
          Team A
        </button>
        <button
          className={`team-button ${selectedTeam === 'teamB' ? 'selected' : ''}`}
          onClick={() => handleTeamSelect('teamB')}
        >
          Team B
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TeamSelection;