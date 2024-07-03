import api from './api';
import { Medico, MedicoRequestDto, MedicoResponseDto } from '../models/Medico';

export const addMedico = async (medicoData: MedicoRequestDto[]): Promise<MedicoResponseDto[]> => {
  try {
    const response = await api.post('/especialistas', medicoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el médico');
  }
};

export const getAll = async (): Promise<Medico[]> => {
  try {
    const response = await api.get('/especialistas');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los médicos');
  }
};

export const updateMedico = async (medicoId: number, medicoData: MedicoRequestDto): Promise<MedicoResponseDto> => {
    try {
        const response = await api.put(`/especialistas/${medicoId}`, medicoData);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el médico');
    }
};
