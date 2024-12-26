import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls
import AddTeam from './addTeam'; // Importing the AddTeam component

const AdminPanel = () => {
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch existing events when component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events'); // Adjust API endpoint as needed
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { name: eventName, code: eventCode };
      const response = await axios.post('/events', newEvent); // Adjust API endpoint as needed
      setEvents([...events, response.data]);
      setEventName('');
      setEventCode('');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/events/${eventId}`); // Adjust API endpoint as needed
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
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
      <h3>Existing Events</h3>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} (Code: {event.code})
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddTeam /> {/* Including the AddTeam component */}
    </div>
  );
};

export default AdminPanel;