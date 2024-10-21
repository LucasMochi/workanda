import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
