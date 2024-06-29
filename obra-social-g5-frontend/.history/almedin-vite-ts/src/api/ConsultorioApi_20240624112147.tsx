import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario';
import { ConsultorioUpdateRequestDto } from '../types/Horario';

const baseURL = 'http://localhost:8080'; // Establece la URL base del servidor backend

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyMzg4NzYsImV4cCI6MTcxOTI0MjQ3NiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI0MzQ1MWQ2Yi0yYjczLTRiZTctODg3Ni0zYzQ3NjBiMjE2ZjgifQ.omxrh_ZTeIl15Qq4xJhTeEvpKzg_-8uOqP8R4ibKxlqoRaYWYrr_xRhO0vW0eByCKGMelSaQNim7Ga-tso-4n5a64QYhOHuRm40ym4z1-QOtEngxYmKOb1PPvru0QyU-Wg6Q86WISFT55X6vY0-9bNzGN9xQgZ59QKL5EexZJSNyqUK2o-SdzhNNQiVobyiRtsEOGSKRjZQY6LqWMrm7qM-CuV2RkaZ_7MGXW7CpJDYOovUIkQ3YmsEzVal76HsrscY1vm7172lU0QFGiNFqvyEUnDFG77pGP1jGpbxDPTwCrSdcwMJ7n63MrTU25pBIryZv_gzprODH5OH_9wcPXQ';

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
