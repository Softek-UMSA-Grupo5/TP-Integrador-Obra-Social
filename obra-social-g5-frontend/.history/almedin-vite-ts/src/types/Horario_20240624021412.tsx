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
