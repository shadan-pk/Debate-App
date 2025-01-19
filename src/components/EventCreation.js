import React, { useState } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const EventCreation = () => {
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const codePattern = /^[A-Za-z0-9]{6}$/;
    if (!codePattern.test(eventCode)) {
      setMessage('Event Code must be 6 alphanumeric characters.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const eventData = { name: eventName, code: eventCode };
      const response = await axios.post('/events', eventData); // Adjust API endpoint as needed
      setMessage(`Event "${response.data.name}" created successfully!`);
      setEventName('');
      setEventCode('');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Error creating event. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-creation">
      <h2>Create New Event</h2>
      <form onSubmit={handleCreateEvent} className="event-form">
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventCode">Event Code:</label>
          <input
            id="eventCode"
            type="text"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            required
            pattern="[A-Za-z0-9]{6}"
            title="6 alphanumeric characters"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default EventCreation;
