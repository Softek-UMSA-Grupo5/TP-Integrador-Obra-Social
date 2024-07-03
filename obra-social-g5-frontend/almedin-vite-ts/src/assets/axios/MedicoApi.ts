import api from './api';
import { MedicoRequestDto, MedicoResponseDto } from '../models/Medico';

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

export const updateMedico = async (medicoId: number, medicoData: MedicoRequestDto): Promise<MedicoResponseDto> => {
    try {
        const response = await api.put(`/especialistas/${medicoId}`, medicoData);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el médico');
    }
};
export const deleteMedico = async (medicoId: number): Promise<void> => {
  try {
    await api.delete(`/especialistas/${medicoId}`);
  } catch (error) {
    throw new Error('Error al eliminar el médico');
  }
};