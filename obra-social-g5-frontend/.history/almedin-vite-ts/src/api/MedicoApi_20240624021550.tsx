import axios from 'axios';
import { MedicoRequest } from '../types/Medico'; // Ajusta la ruta según tu estructura

export const createMedicoAndAssociateToConsultorio = async (medicoData: MedicoRequest, consultorioId: number): Promise<any> => {
  try {
    const response = await axios.post(`/api/addMedicoEndpoint?consultorioId=${consultorioId}`, medicoData);
    return response.data; // Aquí podrías retornar información adicional desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al crear el médico y asociarlo al consultorio');
  }
};
