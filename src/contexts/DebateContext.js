import React, { createContext, useState } from 'react';

export const DebateContext = createContext();

export const DebateProvider = ({ children }) => {
    const [debateData, setDebateData] = useState({
        topics: [],
        participants: [],
        currentTopic: null,
    });

    const addTopic = (topic) => {
        setDebateData((prevData) => ({
            ...prevData,
            topics: [...prevData.topics, topic],
        }));
    };

    const setCurrentTopic = (topic) => {
        setDebateData((prevData) => ({
            ...prevData,
            currentTopic: topic,
        }));
    };

    const addParticipant = (participant) => {
        setDebateData((prevData) => ({
            ...prevData,
            participants: [...prevData.participants, participant],
        }));
    };

    return (
        <DebateContext.Provider value={{ debateData, addTopic, setCurrentTopic, addParticipant }}>
            {children}
        </DebateContext.Provider>
    );
};