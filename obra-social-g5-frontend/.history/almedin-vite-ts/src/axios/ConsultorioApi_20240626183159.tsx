import api from './api';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../types/Consultorio';

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<ConsultorioResponseDto> => {
  try {
    const response = await api.post('/consultorios', consultorioData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};
export const getAllConsultorios = async (): Promise<ConsultorioCreateRequest[]> => {
  try {
    const response = await api.get('/consultorios');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los médicos');
  }
};

