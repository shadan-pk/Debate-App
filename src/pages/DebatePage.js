import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDebate } from '../contexts/DebateContext';
import DebateList from '../components/DebateList';
import DebateDetails from '../components/DebateDetails';
import Timer from '../components/Timer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load AudioPlayer
const AudioPlayer = lazy(() => import('../components/AudioPlayer'));

const DebatePage = () => {
  const { debates, currentDebate, setCurrentDebate, loading, fetchDebates } = useDebate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch debates when the component mounts
    fetchDebates().catch((err) => {
      console.error('Error fetching debates:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Error fetching debates. Please try again later.');
      }
    });
  }, [fetchDebates]);

  const handleDebateSelect = (debate) => {
    setCurrentDebate(debate);
    toast.info(`Selected debate: ${debate.title}`);
  };

  return (
    <div className="debate-page">
      <Header />
      <header>
        <h1>Debate Dashboard</h1>
      </header>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="error" role="alert" aria-live="assertive">
          {error}
        </div>
      ) : (
        <main>
          <section className="debate-list">
            <h2>Active Debates</h2>
            {debates.length > 0 ? (
              <DebateList debates={debates} onSelect={handleDebateSelect} />
            ) : (
              <p>No active debates available at the moment.</p>
            )}
          </section>
          <section className="debate-details">
            {currentDebate ? (
              <>
                <DebateDetails debate={currentDebate} />
                <h3>Timer</h3>
                <Timer
                  initialMinutes={10}
                  initialSeconds={0}
                  onEnd={() => toast.warning('Debate Time Ended')}
                />
                <h3>Audio Player</h3>
                <Suspense fallback={<div>Loading Audio Player...</div>}>
                  <AudioPlayer />
                </Suspense>
              </>
            ) : (
              <div>Select a debate to view details</div>
            )}
          </section>
        </main>
      )}
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default DebatePage;
