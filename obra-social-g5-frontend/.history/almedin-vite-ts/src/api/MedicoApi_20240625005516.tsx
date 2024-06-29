import axios from 'axios';
import { MedicoRequestDto, MedicoResponseDto } from '../types/Medico';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para incluir el token de autorización en todas las peticiones
api.interceptors.request.use((config) => {
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyODc2OTQsImV4cCI6MTcxOTI5MTI5NCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiIwMGIzN2IwMS05ODI1LTQ3MTItODU5OS1mZGZlNmY5YmQzNWYifQ.l_E9XcgvhaWA36yD7qbM_hdktD9g30Zzxt9VXhozJbgNjme5-T4mBLlKBSs2WLFMCehz5oVEPxhO4-SncsjHOLHnUB_SlH4RLnNTphDzjmUZ5HtNt0F0XVCyC_BACl6LR4IfrY6FNJDnL9NAzmcLj6QJloemzb2po851vK7XOF4QCmkQ0OhOdr4ncIJfz-FJ6aTs3A3VSt-hv7QXgdRjoK_WBKtueTlfz1pKXiU70lWi_eelamFyWn6d81EWCnbVi2avhRx4uMpP_V5XJkJZA-k5pLHqvdN3gy-NZ9cNWFQfW_Z1-LJ1C0fK0geqNjRX62Js096HoGBUDjErZ3nZxA';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para crear un médico y asociarlo a un consultorio
export const addMedico = async (medicoData: MedicoRequestDto[]): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.post('/especialistas', medicoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el médico:', error);
    throw new Error('Error al crear el médico');
  }
};

// Función para obtener todos los médicos especialistas
export const getAll = async (): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.get('/especialistas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    throw new Error('Error al obtener los médicos');
  }
};

