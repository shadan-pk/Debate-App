import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = ({ peer }) => {
  const audioRef = useRef(null);
  const [streamAvailable, setStreamAvailable] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleStream = (stream) => {
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
        setStreamAvailable(true);
      }
    };

    const handleError = (err) => {
      console.error('Peer encountered an error:', err);
      setError('An error occurred while receiving the audio stream.');
    };

    try {
      peer.on('stream', handleStream);
      peer.on('error', handleError);
    } catch (err) {
      console.error('Error setting up peer listeners:', err);
      setError('An unexpected error occurred.');
    }

    return () => {
      peer.off('stream', handleStream);
      peer.off('error', handleError);
    };
  }, [peer]);

  return (
    <div>
      <audio ref={audioRef} autoPlay controls aria-label="Audio stream player">
        Your browser does not support the audio element.
      </audio>
      {!streamAvailable && !error && <p>Waiting for audio stream...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
    </div>
  );
};

AudioPlayer.propTypes = {
  peer: PropTypes.shape({
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired,
};

export default AudioPlayer;
