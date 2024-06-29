export interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface Ubicacion {
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
export interface ConsultorioResponseDto {
  id: number;
  horarioAtencion: HorarioResponseDto[];
  ubicacion: UbicacionResponseDto;
  estaEliminado: boolean;
  codigo: string;
  medicoId?: number; // Este campo es opcional en TypeScript
}
export interface HorarioResponseDto {
  id: number;
  diaSemana: HorarioDiaSemanaEnum;
  horaInicio: string; // Aquí puedes ajustar el tipo según cómo se manejen las horas en tu frontend
  horaFin: string;    // Igualmente ajusta el tipo para la hora de fin
  estaEliminado: boolean;
  codigo: string;
}

export enum HorarioDiaSemanaEnum {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIÉRCOLES = 'MIÉRCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES'
}
export interface UbicacionResponseDto {
  id: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
  estaEliminado: boolean;
  codigo: string;
}

