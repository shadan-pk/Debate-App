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

    peer.on('stream', handleStream);
    peer.on('error', handleError);

    // Clean up the event listeners when the component unmounts or the peer changes
    return () => {
      peer.off('stream', handleStream);
      peer.off('error', handleError);
    };
  }, [peer]);

  return (
    <div>
      <audio ref={audioRef} autoPlay controls />
      {!streamAvailable && !error && <p>Waiting for audio stream...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

AudioPlayer.propTypes = {
  peer: PropTypes.object.isRequired, // Adjust the shape as per your peer implementation
};

export default AudioPlayer;
