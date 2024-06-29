export interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
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

