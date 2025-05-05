import axios from 'axios'

const api = axios.create({
  baseURL: '/api',  // Will proxy to Django
})

export const getPatients = () => api.get('/patients/')
export const createPatient = (data) => api.post('/patients/', data)

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        // Handle token refresh here
      }
      return Promise.reject(error);
    }
  );