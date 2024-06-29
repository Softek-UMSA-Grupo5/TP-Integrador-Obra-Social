// src/services/api.ts
import axios from 'axios';
import { Consultorio } from '../models/Consultorio';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
