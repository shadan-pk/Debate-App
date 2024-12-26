export default function TeamSide({ team }) {
    return (
        <div className="team-side">
            <h2>{team.name}</h2>
            <ul>
                {team.members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </div>
    );
}