import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario';
import { ConsultorioUpdateRequestDto } from '../types/Horario';

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const token = localStorage.getItem('accessToken'); // Obtener el token JWT de localStorage
    const response = await axios.post('/api/consultorios', consultorioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Aquí podrías retornar el consultorio creado con su ID desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};

export const updateConsultorio = async (consultorioData: ConsultorioUpdateRequestDto): Promise<void> => {
  try {
    await axios.put('/updateConsultorio', consultorioData);
  } catch (error) {
    throw new Error('Error al actualizar el consultorio');
  }
};