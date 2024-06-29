import axios from 'axios';
import { ConsultorioCreateRequest } from '../types/Horario';
import { ConsultorioUpdateRequestDto } from '../types/Horario';

export const createConsultorio = async (consultorioData: ConsultorioCreateRequest): Promise<unknown> => {
  try {
    const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkyMzQ5MTEsImV4cCI6MTcxOTIzODUxMSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiIxYWIyODkxOC00NzVjLTRiMDctYjM0ZS01ZDBmNWQ1YmEwYjkifQ.egvQgr4MbzOfT8fulHihqsa4ylwqyx4N25QEbwS5WGbbG8PjVqYe1pxI4YzfopxnX58_-uqOGjm5hzi8KrbUK6ModR5PDssMELWevkHNv9VtF_3Vy0G6s0sl0UYx30iGaLySFAtOkbDSOEu0n5KVMhzscim8bcAWbl8zI-9hSScHb2k4lUYe4YNkfY3Dm1Om6fzx5OWlEwCNw6ThqUE8KPVODhgI8r_iY9RvplRE9bdFvHH0dA0jwXI90AGxUgJH4r-ySHp_KgbfZBR_-tPO9JLS2TMOSxYHiCJ3crJgVQ6FuN6J--JSTplc7bAbPZ6kwo10QhCK9aOKgS0uC1NAOw';
    const response = await axios.post('/consultorios', consultorioData, {
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
    await axios.put('/consultorios', consultorioData);
  } catch (error) {
    throw new Error('Error al actualizar el consultorio');
  }
};