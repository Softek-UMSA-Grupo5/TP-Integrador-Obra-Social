import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario';
import { ConsultorioUpdateRequestDto } from '../types/Horario';

const baseURL = 'http://localhost:8080'; // Establece la URL base del servidor backend

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const token = '';

    const response = await axios.post(`${baseURL}/consultorios`, consultorioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el consultorio:', error);
    throw new Error('Error al crear el consultorio');
  }
};

export const updateConsultorio = async (consultorioData: ConsultorioUpdateRequestDto): Promise<void> => {
  try {
    await axios.put(`${baseURL}/consultorios`, consultorioData);
  } catch (error) {
    console.error('Error al actualizar el consultorio:', error);
    throw new Error('Error al actualizar el consultorio');
  }
};
