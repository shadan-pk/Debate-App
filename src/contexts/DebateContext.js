import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const DebateContext = createContext();

export const DebateProvider = ({ children }) => {
  const [debates, setDebates] = useState([]);
  const [currentDebate, setCurrentDebate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing debates when the component mounts
    fetchDebates();
  }, []);

  const fetchDebates = async () => {
    try {
      const response = await axios.get('/debates'); // Adjust API endpoint as needed
      setDebates(response.data);
    } catch (error) {
      console.error('Error fetching debates:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDebate = async (debate) => {
    try {
      const response = await axios.post('/debates', debate); // Adjust API endpoint as needed
      setDebates([...debates, response.data]);
    } catch (error) {
      console.error('Error creating debate:', error);
      throw error;
    }
  };

  const updateDebate = async (debateId, updatedDebate) => {
    try {
      const response = await axios.put(`/debates/${debateId}`, updatedDebate); // Adjust API endpoint as needed
      setDebates(debates.map(debate => debate.id === debateId ? response.data : debate));
    } catch (error) {
      console.error('Error updating debate:', error);
      throw error;
    }
  };

  const deleteDebate = async (debateId) => {
    try {
      await axios.delete(`/debates/${debateId}`); // Adjust API endpoint as needed
      setDebates(debates.filter(debate => debate.id !== debateId));
    } catch (error) {
      console.error('Error deleting debate:', error);
      throw error;
    }
  };

  return (
    <DebateContext.Provider value={{ debates, currentDebate, setCurrentDebate, createDebate, updateDebate, deleteDebate, loading }}>
      {children}
    </DebateContext.Provider>
  );
};

export const useDebate = () => useContext(DebateContext);