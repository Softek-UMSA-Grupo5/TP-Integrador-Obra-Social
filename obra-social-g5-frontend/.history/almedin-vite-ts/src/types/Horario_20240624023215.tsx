export interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  codigo: string;
}

export interface Ubicacion {
  id: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
  codigo: string;
}

export interface ConsultorioCreateRequest {
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  medicoId?: number; // Este campo es opcional
}
export interface ConsultorioUpdateRequestDto {
  id: number; // Identificador del consultorio a actualizar
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  medicoId: number; // Identificador del médico asociado (requerido en el update)
  codigo: string; // Código asociado al consultorio
}