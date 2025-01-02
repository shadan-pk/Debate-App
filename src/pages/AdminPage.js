import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import TeamSide from '../components/TeamSide';
import DebateList from '../components/DebateList';
import useAuth from '../hooks/useAuth';

const AdminPage = () => {
  const { user, loading, logout } = useAuth();
  const [adminAccess, setAdminAccess] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setAdminAccess(true);
    } else {
      setAdminAccess(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adminAccess) {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div className="admin-page">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <section>
          <h2>Manage Users</h2>
          <UserList />
        </section>
        <section>
          <h2>Manage Teams</h2>
          <TeamSide />
        </section>
        <section>
          <h2>Manage Debates</h2>
          <DebateList />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;