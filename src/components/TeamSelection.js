import React from 'react';

const TeamSelection = () => {
    const [teams, setTeams] = React.useState([]);
    const [selectedTeam, setSelectedTeam] = React.useState(null);

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
    };

    React.useEffect(() => {
        // Fetch teams from an API or define them statically
        const fetchTeams = async () => {
            // Example static teams
            const exampleTeams = ['Team A', 'Team B', 'Team C'];
            setTeams(exampleTeams);
        };

        fetchTeams();
    }, []);

    return (
        <div>
            <h2>Select a Team</h2>
            <ul>
                {teams.map((team, index) => (
                    <li key={index} onClick={() => handleTeamSelect(team)}>
                        {team}
                    </li>
                ))}
            </ul>
            {selectedTeam && <p>You have selected: {selectedTeam}</p>}
        </div>
    );
};

export default TeamSelection;