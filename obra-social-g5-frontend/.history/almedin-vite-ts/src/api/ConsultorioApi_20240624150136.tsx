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
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyNTE4NjAsImV4cCI6MTcxOTI1NTQ2MCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJhMjYyZmYzZC02NTZjLTRmM2YtYTM5ZS0wYzFiY2Y5MDc3ZWYifQ.d3sVcQyf96_jjSvw8c_0fiabeHcjYJQoi60D_TDN-Ab1jdXNT4Twt-fdYeLWcRhcmPfmfauOqbSWZ2IA5FGcBLbcQnQ9NHF8yKTNGyU1XElou8u7pkAbyjDVOxsI_5CA78UY2CKottcrFTwOIWOysiaBt59qXoTxOOEcJKOptUpdjVFWblQ0S4pEK_0T1W34AXOaG-XxA3bjkIlsn1GQqOh6LbTY6UUbw6TO5HyiuK5DM76lYheJAdniuTSmCgQ38dIm5CEQYf4KpfMmEIPs1j6UnK8OKN0jokRsBOcVosWsPKalJzcw_Uf3XkDT1Zbeic-I3gxMQMqWMMBxUZWH9Q';
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
