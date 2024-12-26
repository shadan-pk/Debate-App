import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ peer }) => {
  const audioRef = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      audioRef.current.srcObject = stream;
    });

    // Clean up the event listener when the component unmounts or the peer changes
    return () => {
      peer.off('stream');
    };
  }, [peer]);

  return <audio ref={audioRef} autoPlay />;
};

export default AudioPlayer;

