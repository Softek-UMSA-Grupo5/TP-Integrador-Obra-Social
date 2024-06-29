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
  const token ='eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNDM2NDMsImV4cCI6MTcxOTI0NzI0MywiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJlOWM4ZDk1OS02NjhkLTQzYjUtYWNhNi1lZmQxYzcwODU5ZmEifQ.XQstatk6ePs4d6iSrMEP4AyO6hfst58ATKDWx4Enc9sPA4UvO8kUPANeT0i0u3YbH1K6J0iC8Dz3RPpvQrGXz9c0T6lT6_Lt_FSK3GMrjyMT2AeNk_5Q5-_SdM4BKdI4L5orarxDkLcEtgJXnp8gq3YBaDV_VOse2XVT2PDCsIinNv2wx4UiYpowwUnx4zaXtBLhCGppWqabRmxfLG3HYxfI6w8-Zu-735io6Qb1wDebnMzHPUH5noHtb48plU5T5wDTy7cTHYgq0420EsiEBKSvZ0sag8hN1OSfd0CWPwtrW6ZuptyeKHxgIwU2fQ-PJldsq0fu0brDYH2uj5a9dQ';
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

