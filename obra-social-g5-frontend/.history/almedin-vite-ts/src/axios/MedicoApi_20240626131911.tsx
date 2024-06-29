import api from './api';
import { MedicoRequestDto, MedicoResponseDto } from '../types/Medico';

export const addMedico = async (medicoData: MedicoRequestDto[]): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.post('/especialistas', medicoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el médico');
  }
};

export const getAllMedicos = async (): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.get('/especialistas');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los médicos');
  }
};
