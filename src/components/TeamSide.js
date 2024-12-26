import React, { useEffect, useState } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const TeamSide = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

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

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="team-side">
      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id} onClick={() => handleTeamSelect(team)}>
            {team.name}
          </li>
        ))}
      </ul>
      {selectedTeam && (
        <div className="team-details">
          <h3>{selectedTeam.name}</h3>
          <p>ID: {selectedTeam.id}</p>
          <p>Number of Members: {selectedTeam.members.length}</p>
          {/* Add more team details as needed */}
        </div>
      )}
    </div>
  );
};

export default TeamSide;