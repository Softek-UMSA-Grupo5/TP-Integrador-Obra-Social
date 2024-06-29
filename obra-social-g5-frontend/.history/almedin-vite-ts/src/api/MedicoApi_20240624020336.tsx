// api/medicoApi.ts
import axios from 'axios';

interface Medico {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
}

export const createMedicoAndAssociateToConsultorio = async (medicoData: Medico, consultorioId: number): Promise<any> => {
  try {
    const response = await axios.post(`/api/addMedicoEndpoint?consultorioId=${consultorioId}`, medicoData);
    return response.data; // Aquí podrías retornar información adicional desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al crear el médico y asociarlo al consultorio');
  }
};
