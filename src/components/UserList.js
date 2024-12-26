import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // Ensure this service is set up for API calls

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users'); // Adjust API endpoint as needed
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="user-details">
          <h3>{selectedUser.name}</h3>
          <p>ID: {selectedUser.id}</p>
          <p>Email: {selectedUser.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default UserList;