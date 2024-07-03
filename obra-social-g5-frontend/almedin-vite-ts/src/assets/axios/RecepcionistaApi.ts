import api from "./api";
import { Recepcionista, RecepcionistaRequestDto, RecepcionistaResponseDto, RecepcionistaUpdateRequestDto } from "../models/Recepcionista";

export const addRecepcionista = async (dto: RecepcionistaRequestDto): Promise<Recepcionista> => {
  try {
    const response = await api.post('/recepcionistas', dto); 
    return response.data as Recepcionista;
  } catch (error) {
    throw new Error('Error al crear el recepcionista');
  }
};
export const getAllRecepcionistas = async (): Promise<RecepcionistaResponseDto[]> => {
  try {
    const response = await api.get('/recepcionistas');
    return response.data as RecepcionistaResponseDto[];
  } catch (error) {
    throw new Error('Error al obtener los recepcionistas');
  }
};
export const updateRecepcionista = async (dto: RecepcionistaUpdateRequestDto): Promise<void> => {
  try {
    await api.put('/recepcionistas', dto);
  } catch (error) {
    throw new Error('Error al actualizar el recepcionista');
  }
};