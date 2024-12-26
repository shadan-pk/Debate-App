import React from 'react';

const DebateDetails = ({ debate }) => {
  if (!debate) {
    return <div>No debate selected</div>;
  }

  return (
    <div>
      <h3>Debate Details</h3>
      <p><strong>Title:</strong> {debate.title}</p>
      <p><strong>Description:</strong> {debate.description}</p>
      <p><strong>Participants:</strong></p>
      <ul>
        {debate.participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebateDetails;