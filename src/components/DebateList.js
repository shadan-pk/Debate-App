import React from 'react';

const DebateList = ({ debates, onSelect }) => {
  return (
    <div>
      <h3>Debate List</h3>
      <ul>
        {debates.map((debate) => (
          <li key={debate.id} onClick={() => onSelect(debate)}>
            {debate.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebateList;