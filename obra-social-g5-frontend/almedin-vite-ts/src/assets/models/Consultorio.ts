import { Horario, HorarioResponseDto } from "./Horario";
import { Medico } from "./Medico";
import { Ubicacion, UbicacionResponseDto } from "./Ubicacion";


export interface Consultorio {
    id: number;
    horarioAtencion: Horario[];
    ubicacion: Ubicacion;
    estaEliminado: boolean;
    codigo: string;
    medico: Medico | null; // Medico puede ser nulo si no está asignado
}
export interface ConsultorioCreateRequest {
    id?: number;
    horarioAtencion: { diaSemana: string; horaInicio: string; horaFin: string }[];
    ubicacion: {
        ciudad: string;
        provincia: string;
        calle: string;
        altura: number;
    };
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