import axios from 'axios';
import { ConsultorioCreateRequest, ConsultorioResponseDto} from '../types/Horario'; 
import { MedicoRequestDto, MedicoResponseDto } from '../types/Medico'; 


const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNjY0NTIsImV4cCI6MTcxOTI3MDA1MiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI5ZmNlMTNmMC1lOTJjLTQ0MDgtODg3Ni1jZDRmN2VlM2YwOWIifQ.aNofwTod6tgpRPt_AoNlwJHnZOkamE6Pp9QAM5O7mm7lTzqaNjRxxGZfugCrl93jyLBnzBVPIMExeyBOLGaE57cBZ-Krzhgh3lUkI8MO8r5UFSoPsdeqRKVEuD4IfHTwb98g3lkNerRZFm2fs7zlduGnJrESZK3GxjGxVo9US5uCc3bJ7lDlHLds_8adfWzlOi34vdMlJC40-7jHTpSDh3w91PWNLkzyEeyVCklliH6MZfCjRumAobepMyuvenHJR6E4moGsh-5X5Fi8mTCvKTvGYrqm1bzaGLkkAzlY4dmB15WvVmt98Hvv6zEH_80hWhjzj3vW8MIgbsivJCvR6g';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<ConsultorioResponseDto> => {
  try {
    const response = await api.post('/consultorios', consultorioData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el consultorio:', error);
    throw new Error('Error al crear el consultorio');
  }
};

export const addMedico = async (medicoData: MedicoRequestDto[]): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.post('/especialistas', medicoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el médico:', error);
    throw new Error('Error al crear el médico');
  }
};
