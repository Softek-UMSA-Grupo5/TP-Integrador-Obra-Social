import axios from 'axios';

interface Consultorio {
  nombre: string;
  direccion: string;
  // Otros campos del consultorio
}

export const createConsultorio = async (consultorioData: Consultorio): Promise<any> => {
  try {
    const response = await axios.post('/api/createConsultorioEndpoint', consultorioData);
    return response.data; // Aquí podrías retornar el consultorio creado con su ID desde el backend si es necesario
  } catch (error) {
    throw new Error('Error al crear el consultorio');
  }
};
