// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../services/api'; // Ensure this service is set up for API calls
// import { AuthContext } from '../contexts/AuthContext';
// import { DebateContext } from '../contexts/DebateContext';
// import { toast } from 'react-toastify'; // Optional: for toast notifications
// import 'react-toastify/dist/ReactToastify.css';

// const TeamSelection = () => {
//   const { user } = useContext(AuthContext);
//   const { setTeams } = useContext(DebateContext);
//   const [selectedTeam, setSelectedTeam] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Optional: Fetch existing team selection on component mount
//   useEffect(() => {
//     const fetchUserTeam = async () => {
//       try {
//         const response = await axios.get(`/user-team/${user.id}`);
//         setSelectedTeam(response.data.team);
//       } catch (error) {
//         console.error('Error fetching user team:', error);
//         // Optionally set an error state or notify the user
//       }
//     };

//     if (user && user.id) {
//       fetchUserTeam();
//     }
//   }, [user]);

//   const handleTeamSelect = async (team) => {
//     setSelectedTeam(team);
//     setError('');
//     setLoading(true);

//     try {
//       const response = await axios.post('/select-team', { userId: user.id, team });
//       setTeams(response.data.teams);
//       toast.success(`You have selected ${team === 'teamA' ? 'Team A' : 'Team B'}`);
//       navigate('/debate');
//     } catch (error) {
//       console.error('Error selecting team:', error);
//       if (error.response) {
//         setError(`Error: ${error.response.data.message || 'Unable to select team.'}`);
//       } else if (error.request) {
//         setError('Network error. Please check your connection.');
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const teams = [
//     { id: 'teamA', name: 'Team A', description: 'Focuses on environmental issues.' },
//     { id: 'teamB', name: 'Team B', description: 'Emphasizes economic policies.' },
//     // Add more teams as needed
//   ];

//   return (
//     <div className="team-selection">
//       <h2>Select Your Team</h2>
//       {error && <p className="error">{error}</p>}
//       <div className="teams">
//         {teams.map((team) => (
//           <div key={team.id} className="team-option">
//             <button
//               className={`team-button ${selectedTeam === team.id ? 'selected' : ''}`}
//               onClick={() => handleTeamSelect(team.id)}
//               disabled={loading || selectedTeam === team.id}
//               aria-pressed={selectedTeam === team.id}
//             >
//               {loading && selectedTeam === team.id ? 'Selecting...' : team.name}
//             </button>
//             <p className="team-description">{team.description}</p>
//           </div>
//         ))}
//       </div>
//       {/* Optional: Toast notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default TeamSelection;
