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
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNDg5ODUsImV4cCI6MTcxOTI1MjU4NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJhMTRkNDU4MC1jNTZlLTRhMTEtOWJiMC1mZDk4YjY0NTZlOWQifQ.c_ytsnfh8EPc6C7QSHhdMxnnmLYJ-3pSLyo6FoUnCb8PndG-3QlxE-vCGE5y3zt6aRkVLR9LzIu3MfPo7GOAOOgwXjz4R-zFQsKTavSPw1949FRl3e_qBo0MIf5Vg9J2ao6_CBQuM-KnrRDgk0K7HNWj4LzWo2bVNgjSZBE23jEPJomCJZ89MNJ-hJI0uc7LXDsf17ciW6ljLegkBQNt3HH9oPa4oTzpwaSWO-u6JCraNnci_d5zTnKbE5RrJgF3qZD3YOVdCr6JlaFlMyiN2bc-azUxmvfhQYAK-1r7w0_KGPOK9GEGR2xnt0lZjFGROk9arP9IHROyN9PFyVhiEg';
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
