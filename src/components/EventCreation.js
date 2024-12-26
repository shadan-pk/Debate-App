import React, { useState } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const EventCreation = () => {
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const eventData = { name: eventName, code: eventCode };
      const response = await axios.post('/events', eventData); // Adjust API endpoint as needed
      setMessage(`Event "${response.data.name}" created successfully!`);
      setEventName('');
      setEventCode('');
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Error creating event. Please try again.');
    }
  };

  return (
    <div className="event-creation">
      <h2>Create New Event</h2>
      <form onSubmit={handleCreateEvent}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Code:</label>
          <input
            type="text"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventCreation;