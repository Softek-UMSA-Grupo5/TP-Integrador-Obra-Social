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
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyMzg4NzYsImV4cCI6MTcxOTI0MjQ3NiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI0MzQ1MWQ2Yi0yYjczLTRiZTctODg3Ni0zYzQ3NjBiMjE2ZjgifQ.omxrh_ZTeIl15Qq4xJhTeEvpKzg_-8uOqP8R4ibKxlqoRaYWYrr_xRhO0vW0eByCKGMelSaQNim7Ga-tso-4n5a64QYhOHuRm40ym4z1-QOtEngxYmKOb1PPvru0QyU-Wg6Q86WISFT55X6vY0-9bNzGN9xQgZ59QKL5EexZJSNyqUK2o-SdzhNNQiVobyiRtsEOGSKRjZQY6LqWMrm7qM-CuV2RkaZ_7MGXW7CpJDYOovUIkQ3YmsEzVal76HsrscY1vm7172lU0QFGiNFqvyEUnDFG77pGP1jGpbxDPTwCrSdcwMJ7n63MrTU25pBIryZv_gzprODH5OH_9wcPXQ';
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

