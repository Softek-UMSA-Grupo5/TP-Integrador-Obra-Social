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
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkzNDM1OTUsImV4cCI6MTcxOTM0NzE5NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI3NDMxYTZkNC01ZThjLTRmMzAtYmExMi1hYWIwZDE3NDQ3OGQifQ.RIbmUyO4QdK2yow_MheZpyK9ia1GYD9dykkGbEpKq8lh2wNZW2FLCqdh7-1iRED0zso9JlYkDGQY--xZkeTPhg9pMU_YqFrnIcnaA6unCBuDxYffj1wXiuVSvhzUoCq5oz15ZqepM5RusoOoYhtfpRkmFBLw40uoJoSyDTEml5s6R_3f2v6EH_vl8Xhj3vae9DaNPB94g3uvCHFafl-0_s3AdriQSoYLS_kY9OKvLwda5p4gBg5YiQ71Invo8Vm29sacskyoViQCMd9VlRZ3jbcll73LdblmcauF9F3r00a1UmZgze0zC2dpG9ZB_gvTPcvNXn3hxjgPMkbFITWlEQ';
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
