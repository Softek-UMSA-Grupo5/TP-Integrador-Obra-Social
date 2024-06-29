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
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNjY0NTIsImV4cCI6MTcxOTI3MDA1MiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI5ZmNlMTNmMC1lOTJjLTQ0MDgtODg3Ni1jZDRmN2VlM2YwOWIifQ.aNofwTod6tgpRPt_AoNlwJHnZOkamE6Pp9QAM5O7mm7lTzqaNjRxxGZfugCrl93jyLBnzBVPIMExeyBOLGaE57cBZ-Krzhgh3lUkI8MO8r5UFSoPsdeqRKVEuD4IfHTwb98g3lkNerRZFm2fs7zlduGnJrESZK3GxjGxVo9US5uCc3bJ7lDlHLds_8adfWzlOi34vdMlJC40-7jHTpSDh3w91PWNLkzyEeyVCklliH6MZfCjRumAobepMyuvenHJR6E4moGsh-5X5Fi8mTCvKTvGYrqm1bzaGLkkAzlY4dmB15WvVmt98Hvv6zEH_80hWhjzj3vW8MIgbsivJCvR6g';
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

