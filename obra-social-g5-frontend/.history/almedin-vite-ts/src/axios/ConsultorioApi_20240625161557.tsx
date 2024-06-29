import axios from 'axios';
import { ConsultorioCreateRequest, ConsultorioResponseDto} from '../types/Consultorio'; 
import { MedicoRequestDto, MedicoResponseDto } from '../types/Medico'; 


const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkzNDI5MDgsImV4cCI6MTcxOTM0NjUwOCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI3NjZmYmI5ZS1jNTdiLTRjNTctYWUyNS1mNWJiMzIzZWNlNzMifQ.eo37-4QUwxTIdd2B_KSqrEcvfu7pOwJr88fpwV7JCgPAdz5HdrO_QvV96vfWSLvEVqexXmbvfjTlQ6NcC0MGNRSMTfd73Lja0OIa3Bg2V3BQmhaMS_gco566RTXPrWha86ZV1ZGZwEoIDO3zCqyg7UnnbA_nugiLUIei21W0kjWnsIFzXyQ1OmFhKntQvJbufPfAsIv98QPOERrJyN2iLM9GjuuXnhXmeVCaNGsP89wZ7Qb7zYFftwgxIq4N_OrcKmwmWEZ-JVvZ7FaO9cpsU3pFz6jqYj4vzyxKdqTju6x2oizksv-tZt-B30jUdXfHxNPJ81b32nPTxpETqo0AeA';
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
