import axios from 'axios';

// Set up the base URL for your API requests
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Update with your Django backend API URL
});

export default instance;
