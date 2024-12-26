import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes = 0, initialSeconds = 0, onEnd }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
            if (onEnd) onEnd(); // Call the onEnd function when the timer ends
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, onEnd]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="timer">
      <div className="time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="controls">
        <button onClick={handleStart} disabled={isActive}>Start</button>
        <button onClick={handlePause} disabled={!isActive}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;