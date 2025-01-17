import React, { useState, useEffect, useCallback } from 'react';
import axios from '../services/api';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get('/users', { params: { search: query } });
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response) {
        setError(`Error: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const debouncedFetch = useCallback(debounce((query) => {
    fetchUsers(query);
  }, 300), [fetchUsers]);

  useEffect(() => {
    debouncedFetch(searchTerm);
    return debouncedFetch.cancel;
  }, [searchTerm, debouncedFetch]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li
              key={user.id}
              onClick={() => handleUserSelect(user)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleUserSelect(user);
              }}
              tabIndex="0"
              role="button"
              aria-pressed={selectedUser?.id === user.id}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
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
