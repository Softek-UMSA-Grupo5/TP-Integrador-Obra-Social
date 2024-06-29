import axios from 'axios';
import { MedicoRequest, MedicoResponseDto } from '../types/Medico';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token JWT (ajusta esto según cómo obtienes el token en tu aplicación)
/* const getToken = () => {
  return localStorage.getItem('token'); // O cualquier otro método que uses para almacenar el token
}; */

api.interceptors.request.use((config) => {
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyMzQ5MTEsImV4cCI6MTcxOTIzODUxMSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiIxYWIyODkxOC00NzVjLTRiMDctYjM0ZS01ZDBmNWQ1YmEwYjkifQ.egvQgr4MbzOfT8fulHihqsa4ylwqyx4N25QEbwS5WGbbG8PjVqYe1pxI4YzfopxnX58_-uqOGjm5hzi8KrbUK6ModR5PDssMELWevkHNv9VtF_3Vy0G6s0sl0UYx30iGaLySFAtOkbDSOEu0n5KVMhzscim8bcAWbl8zI-9hSScHb2k4lUYe4YNkfY3Dm1Om6fzx5OWlEwCNw6ThqUE8KPVODhgI8r_iY9RvplRE9bdFvHH0dA0jwXI90AGxUgJH4r-ySHp_KgbfZBR_-tPO9JLS2TMOSxYHiCJ3crJgVQ6FuN6J--JSTplc7bAbPZ6kwo10QhCK9aOKgS0uC1NAOw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createMedicoAndAssociateToConsultorio = async (medicoData: MedicoRequest, consultorioId: number): Promise<unknown> => {
  try {
    const response = await api.post(`/especialistas?consultorioId=${consultorioId}`, medicoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el médico y asociarlo al consultorio:', error);
    throw new Error('Error al crear el médico y asociarlo al consultorio');
  }
};

export const getAll = async (): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.get('/especialistas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    throw new Error('Error al obtener los médicos');
  }
};

