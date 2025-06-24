// src/services/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ adds JWT
  }
  return config;
});

export default instance;
