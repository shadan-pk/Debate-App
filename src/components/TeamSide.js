import React, { useEffect, useState, useCallback } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const TeamSide = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/teams'); // Adjust API endpoint as needed
      setTeams(response.data);
    } catch (error) {
      setError('Failed to fetch teams. Please try again later.');
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleTeamSelect = (team) => setSelectedTeam(team);

  return (
    <div className="team-side">
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul className="team-list">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              className={selectedTeam?.id === team.id ? 'selected' : ''}
              tabIndex={0}
              role="button"
              aria-selected={selectedTeam?.id === team.id}
            >
              {team.name}
            </li>
          ))}
        </ul>
      )}
      {selectedTeam && (
        <div className="team-details">
          <h3>{selectedTeam.name}</h3>
          <p>ID: {selectedTeam.id}</p>
          <p>Number of Members: {selectedTeam.members?.length || 0}</p>
          {/* Add more team details as needed */}
        </div>
      )}
    </div>
  );
};

export default TeamSide;
