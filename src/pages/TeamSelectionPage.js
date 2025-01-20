import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useDebate } from '../contexts/DebateContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamSide from '../components/TeamSide';

const TeamSelectionPage = () => {
  const { user } = useAuth();
  const { teams, fetchTeams, joinTeam } = useDebate();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    fetchTeams()
      .catch(() => setError('Error fetching teams. Please try again later.'))
      .finally(() => setLoading(false));
  }, [user, fetchTeams, navigate]);

  const handleTeamSelect = (team) => setSelectedTeam(team);

  const handleJoinTeam = async () => {
    if (!selectedTeam) {
      setError('Please select a team to join.');
      return;
    }
    try {
      setError('');
      await joinTeam(selectedTeam.id);
      navigate('/debates');
    } catch {
      setError('Error joining team. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div>Loading teams...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <h1>Team Selection</h1>
        {error && <div className="error">{error}</div>}
        <div className="team-list">
          {teams.map((team) => (
            <TeamSide
              key={team.id}
              team={team}
              onSelect={() => handleTeamSelect(team)}
              selected={selectedTeam?.id === team.id}
            />
          ))}
        </div>
        <button
          onClick={handleJoinTeam}
          disabled={!selectedTeam}
          className={!selectedTeam ? 'disabled' : ''}
        >
          Join Team
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default TeamSelectionPage;
