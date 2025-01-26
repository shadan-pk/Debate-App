import React, { useEffect, useState, useCallback } from 'react';
import axios from '../services/api';


const TeamSide = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [retry, setRetry] = useState<number>(0);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<Team[]>('/teams');
      setTeams(response.data);
    } catch (err: any) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch teams.'}`);
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams, retry]);

  // const handleTeamSelect = (team: Team) => setSelectedTeam(team);

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLLIElement>, team: Team) => {
  //   if (event.key === 'Enter' || event.key === ' ') {
  //     handleTeamSelect(team);
  //   }
  // };

  const handleRetry = () => setRetry((prev) => prev + 1);

  return (
    <div className="team-side">
      <h2>Teams</h2>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading teams...</p>
        </div>
      )}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">Retry</button>
        </div>
      )}
      {!loading && !error && (
        <ul className="team-list" role="listbox" aria-label="Team List">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              onKeyPress={(e) => handleKeyPress(e, team)}
              className={`team-item ${selectedTeam?.id === team.id ? 'selected' : ''}`}
              tabIndex={0}
              role="option"
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
          <p><strong>ID:</strong> {selectedTeam.id}</p>
          <p><strong>Number of Members:</strong> {selectedTeam.members?.length || 0}</p>
          {/* Add more team details as needed */}
        </div>
      )}
    </div>
  );
};

export default TeamSide;
