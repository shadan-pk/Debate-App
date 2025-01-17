import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './MicControl.module.css';

const MicControl = ({ onToggle }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async () => {
    if (isMicOn) {
      // Turn Mic Off
      setIsMicOn(false);
      onToggle(false);
      setError('');
      // Additional logic to mute microphone
    } else {
      // Turn Mic On
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicOn(true);
        onToggle(true);
        setError('');
        // Additional logic to unmute microphone
      } catch (err) {
        console.error('Microphone access denied:', err);
        setError('Microphone access denied. Please allow access in your browser settings.');
      }
    }
  };

  return (
    <div className={styles.micControl}>
      <button
        className={styles.micButton}
        onClick={handleToggle}
        aria-pressed={isMicOn}
        aria-label={isMicOn ? 'Turn microphone off' : 'Turn microphone on'}
      >
        <FontAwesomeIcon
          icon={isMicOn ? faMicrophoneSlash : faMicrophone}
          className={styles.icon}
        />
        {isMicOn ? 'Turn Mic Off' : 'Turn Mic On'}
      </button>
      {error && (
        <p className={styles.error}>
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </p>
      )}
    </div>
  );
};

MicControl.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default MicControl;
