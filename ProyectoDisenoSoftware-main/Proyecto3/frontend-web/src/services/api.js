import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // cambia esto según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar un interceptor si luego usás token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;