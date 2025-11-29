import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Your Spring Boot Port
});

// Add JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;