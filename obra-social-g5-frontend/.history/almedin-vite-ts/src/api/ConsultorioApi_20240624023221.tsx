import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario'; // Ajusta la ruta según tu estructura

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const response = await axios.post('/cosultorios', consultorioData);
    return response.data; // Aquí podrías retornar el consultorio creado con su ID desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};
export const updateConsultorio = async (consultorioData: ConsultorioUpdateRequestDto): Promise<any> => {
  try {
    const response = await axios.put('/updateConsultorio', consultorioData); // Ruta ajustada a '/updateConsultorio'
    return response.data; // Aquí podrías retornar información adicional desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al actualizar el consultorio');
  }
};
