import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login/`, credentials);
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
  }
  return response.data;
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};