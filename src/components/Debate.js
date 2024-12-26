import React, { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import AudioPlayer from './AudioPlayer';
import { AuthContext } from '../contexts/AuthContext';
import { DebateContext } from '../contexts/DebateContext';
import MicControl from './MicControl';
import Timer from './Timer';

const socket = io('http://localhost:5000'); // Update with your server URL

const Debate = () => {
  const { user } = useContext(AuthContext);
  const { teams } = useContext(DebateContext);
  const [peers, setPeers] = useState([]);
  const userAudio = useRef();
  const peersRef = useRef([]);
  const [isMicOn, setIsMicOn] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      userAudio.current.srcObject = stream;

      socket.emit('join room', 'ROOM_ID'); // Replace 'ROOM_ID' with actual room ID

      socket.on('all users', (users) => {
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socket.on('user joined', (payload) => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers((users) => [...users, peer]);
      });

      socket.on('receiving returned signal', (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const handleMicToggle = (micStatus) => {
    setIsMicOn(micStatus);
    // Additional logic to handle mic status can be added here
  };

  const handleTimeUp = () => {
    setIsMicOn(false);
    // Additional logic to handle when time is up
  };

  return (
    <div className="debate-page">
      <div className="team team-left">
        <h2>Team A</h2>
        {teams.teamA.map((user, index) => (
          <div key={index} className="user-square">{user}</div>
        ))}
      </div>
      <div className="team team-right">
        <h2>Team B</h2>
        {teams.teamB.map((user, index) => (
          <div key={index} className="user-square">{user}</div>
        ))}
      </div>
      <audio ref={userAudio} autoPlay muted={true} />
      {peers.map((peer, index) => (
        <AudioPlayer key={index} peer={peer} />
      ))}
      <MicControl onToggle={handleMicToggle} />
      <Timer duration={300} onTimeUp={handleTimeUp} /> {/* 5-minute timer */}
    </div>
  );
};

export default Debate;