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
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNDg5ODUsImV4cCI6MTcxOTI1MjU4NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJhMTRkNDU4MC1jNTZlLTRhMTEtOWJiMC1mZDk4YjY0NTZlOWQifQ.c_ytsnfh8EPc6C7QSHhdMxnnmLYJ-3pSLyo6FoUnCb8PndG-3QlxE-vCGE5y3zt6aRkVLR9LzIu3MfPo7GOAOOgwXjz4R-zFQsKTavSPw1949FRl3e_qBo0MIf5Vg9J2ao6_CBQuM-KnrRDgk0K7HNWj4LzWo2bVNgjSZBE23jEPJomCJZ89MNJ-hJI0uc7LXDsf17ciW6ljLegkBQNt3HH9oPa4oTzpwaSWO-u6JCraNnci_d5zTnKbE5RrJgF3qZD3YOVdCr6JlaFlMyiN2bc-azUxmvfhQYAK-1r7w0_KGPOK9GEGR2xnt0lZjFGROk9arP9IHROyN9PFyVhiEg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para crear un médico y asociarlo a un consultorio
export const addMedico = async (medicoData: MedicoRequestDto[]): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.post('/addMedico', medicoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el médico:', error);
    throw new Error('Error al crear el médico');
  }
};

// Función para obtener todos los médicos especialistas
export const getAllMedicos = async (): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.get('/getAll');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    throw new Error('Error al obtener los médicos');
  }
};

