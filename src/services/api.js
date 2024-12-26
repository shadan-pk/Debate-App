import axios from 'axios';

// Create an instance of axios with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add more configuration options here
});

// Optionally, you can add interceptors for request/response here

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify config before request is sent
    // For example, add an auth token to headers if needed
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle response error
    return Promise.reject(error);
  }
);


// Function to handle user login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to fetch debates
export const fetchDebates = async () => {
  try {
    const response = await api.get('/debates');
    return response.data;
  } catch (error) {
    console.error('Error fetching debates:', error);
    throw error;
  }
};

// Function to fetch teams
export const fetchTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Function to join a team
export const joinTeam = async (teamId) => {
  try {
    const response = await api.post(`/teams/${teamId}/join`);
    return response.data;
  } catch (error) {
    console.error('Error joining team:', error);
    throw error;
  }
};

// Add more API functions as needed...

export default api;