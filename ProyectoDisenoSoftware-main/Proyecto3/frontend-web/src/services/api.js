import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
  
});

export const getSlides = async () => {
  try {
    const res = await api.get('/carrusel');
    return res.data;
  } catch (err) {
    console.error('Error al obtener los slides:', err);
    return [];
  }
};

// Puedes agregar un interceptor si luego usás token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;