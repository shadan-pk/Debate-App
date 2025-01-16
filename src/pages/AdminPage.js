// AdminPage.jsx
import React, { useEffect, useMemo, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './AdminPage.module.css'; // Assuming you're using CSS Modules

// Lazy load components for code splitting
const UserList = lazy(() => import('../components/UserList'));
const TeamSide = lazy(() => import('../components/TeamSide'));
const DebateList = lazy(() => import('../components/DebateList'));

const AdminPage = () => {
  const { user, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  // Determine if the user has admin access
  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  // Redirect unauthorized users
  useEffect(() => {
    if (!isAdmin && !loading) {
      navigate('/not-authorized'); // Ensure this route exists in your routing configuration
    }
  }, [isAdmin, loading, navigate]);

  // Handle loading state
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  // If user is not admin, do not render the admin page (redirecting instead)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} aria-label="Logout" className={styles.logoutButton}>
          Logout
        </button>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Manage Users</h2>
          <Suspense fallback={<div>Loading Users...</div>}>
            <UserList />
          </Suspense>
        </section>
        <section className={styles.section}>
          <h2>Manage Teams</h2>
          <Suspense fallback={<div>Loading Teams...</div>}>
            <TeamSide />
          </Suspense>
        </section>
        <section className={styles.section}>
          <h2>Manage Debates</h2>
          <Suspense fallback={<div>Loading Debates...</div>}>
            <DebateList />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
