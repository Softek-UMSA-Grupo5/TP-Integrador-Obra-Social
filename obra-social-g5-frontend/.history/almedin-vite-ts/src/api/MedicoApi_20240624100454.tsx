import axios from 'axios';
import { MedicoRequest } from '../types/Medico';

const api = axios.create({
  baseURL: 'https://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token JWT (ajusta esto según cómo obtienes el token en tu aplicación)
const getToken = () => {
  return localStorage.getItem('token'); // O cualquier otro método que uses para almacenar el token
};

api.interceptors.request.use((config) => {
  const token = getToken();
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

export const getAllMedicos = async (): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.get('/especialistas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    throw new Error('Error al obtener los médicos');
  }
};
export interface MedicoResponseDto {
    id: number;                // En TypeScript, Long se mapea a number
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: string;   // Date en Java se puede mapear a string (ISO 8601) en TypeScript
    estaEliminado: boolean;
    especialidad: string;
}
