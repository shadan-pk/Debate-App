import React, { useEffect, useState } from 'react';
import { useDebate } from '../contexts/DebateContext'; // Importing the DebateContext
import DebateList from '../components/DebateList'; // Importing the DebateList component
import DebateDetails from '../components/DebateDetails'; // Importing the DebateDetails component
import Timer from '../components/Timer'; // Importing the Timer component
import Header from '../components/Header'; // Importing the Header component
import Footer from '../components/Footer'; // Importing the Footer component
import AudioPlayer from '../components/AudioPlayer'; // Importing the AudioPlayer component

const DebatePage = () => {
  const { debates, currentDebate, setCurrentDebate, loading, fetchDebates } = useDebate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch debates when the component mounts
    fetchDebates().catch((err) => setError('Error fetching debates. Please try again later.'));
  }, [fetchDebates]);

  const handleDebateSelect = (debate) => {
    setCurrentDebate(debate);
  };

  return (
    <div className="debate-page">
      <Header />
      <header>
        <h1>Debate Dashboard</h1>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <main>
          <section className="debate-list">
            <h2>Active Debates</h2>
            <DebateList debates={debates} onSelect={handleDebateSelect} />
          </section>
          <section className="debate-details">
            {currentDebate ? (
              <>
                <DebateDetails debate={currentDebate} />
                <h3>Timer</h3>
                <Timer initialMinutes={10} initialSeconds={0} onEnd={() => console.log('Debate Time Ended')} />
                <h3>Audio Player</h3>
                <AudioPlayer />
              </>
            ) : (
              <div>Select a debate to view details</div>
            )}
          </section>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default DebatePage;