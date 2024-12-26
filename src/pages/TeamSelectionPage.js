import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Importing the useAuth hook
import { useDebate } from '../contexts/DebateContext'; // Importing the useDebate hook
import Header from '../components/Header'; // Importing the Header component
import Footer from '../components/Footer'; // Importing the Footer component
import TeamSide from '../components/TeamSide'; // Importing the TeamSide component

const TeamSelectionPage = () => {
  const { user } = useAuth();
  const { teams, fetchTeams, joinTeam } = useDebate();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams().catch((err) => setError('Error fetching teams. Please try again later.'));
  }, [fetchTeams]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleJoinTeam = async () => {
    if (!selectedTeam) {
      setError('Please select a team to join.');
      return;
    }

    try {
      await joinTeam(selectedTeam.id);
      navigate('/debates'); // Redirect to debates page after joining a team
    } catch (err) {
      setError('Error joining team. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Team Selection</h1>
        {error && <div>{error}</div>}
        <div>
          {teams.map((team) => (
            <TeamSide
              key={team.id}
              team={team}
              onSelect={() => handleTeamSelect(team)}
              selected={selectedTeam && selectedTeam.id === team.id}
            />
          ))}
        </div>
        <button onClick={handleJoinTeam}>Join Team</button>
      </div>
      <Footer />
    </div>
  );
};

export default TeamSelectionPage;