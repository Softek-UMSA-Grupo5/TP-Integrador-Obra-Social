export interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface Ubicacion {
  id?: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
}

export interface ConsultorioCreateRequest {
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  medicoId?: number; 
}
export interface ConsultorioUpdateRequestDto {
  id: number; 
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  medicoId: number; 
  codigo: string;
} 
export interface ConsultorioResponseDto {
  id: number;
  horarioAtencion: HorarioResponseDto[];
  ubicacion: UbicacionResponseDto;
  estaEliminado: boolean;
  codigo: string;
  medicoId?: number; 
}
export interface HorarioResponseDto {
  id: number;
  diaSemana: HorarioDiaSemanaEnum;
  horaInicio: string; 
  horaFin: string;   
  estaEliminado: boolean;
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

