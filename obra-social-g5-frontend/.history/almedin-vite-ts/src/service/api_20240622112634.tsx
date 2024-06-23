// src/services/api.ts
import axios from 'axios';
import { Consultorio } from '../models/Consultorio';

const API_BASE_URL = 'http://localhost:8080'; // Cambia esto si tu backend corre en otra URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Cambia esto si usas sessionStorage o algún otro método de almacenamiento
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchConsultorios = async (): Promise<Consultorio[]> => {
  try {
    const response = await api.get('/consultorios');
    return response.data;
  } catch (error) {
    console.error("Error fetching consultorios:", error);
    throw error;
  }
};
