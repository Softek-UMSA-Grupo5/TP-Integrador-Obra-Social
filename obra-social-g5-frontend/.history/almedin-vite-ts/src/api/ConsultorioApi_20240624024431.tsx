import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario';
import { ConsultorioUpdateRequestDto } from '../types/Horario';

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const token = localStorage.getItem('accessToken'); 
    const response = await axios.post('/consultorios', consultorioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};
export const updateConsultorio = async (consultorioData: ConsultorioUpdateRequestDto): Promise<void> => {
  try {
    const token = localStorage.getItem('accessToken'); // Obtener el token JWT de localStorage
    await axios.put(`/api/consultorios/${consultorioData.id}`, consultorioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // No necesitas retornar nada explícitamente si la función es de tipo void
  } catch (error) {
    throw new Error('Error al actualizar el consultorio');
  }
};