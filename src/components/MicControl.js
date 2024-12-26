import React, { useState } from 'react';

const MicControl = ({ onToggle }) => {
  const [isMicOn, setIsMicOn] = useState(false);

  const handleToggle = () => {
    const newMicStatus = !isMicOn;
    setIsMicOn(newMicStatus);
    onToggle(newMicStatus); // Call the onToggle function passed as a prop to notify the parent component
  };

  return (
    <div className="mic-control">
      <button onClick={handleToggle}>
        {isMicOn ? 'Turn Mic Off' : 'Turn Mic On'}
      </button>
    </div>
  );
};

export default MicControl;