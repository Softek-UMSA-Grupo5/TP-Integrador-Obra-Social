import api from './api';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../models/Consultorio';

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<ConsultorioResponseDto> => {
  try {
    const response = await api.post('/consultorios', consultorioData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};
export const getAllConsultorios = async (): Promise<ConsultorioResponseDto[]> => {
    try {
        const response = await api.get('/consultorios');
        return response.data; // Se espera que response.data sea un array de ConsultorioResponseDto
    } catch (error) {
        throw new Error('Error al obtener los consultorios');
    }
};