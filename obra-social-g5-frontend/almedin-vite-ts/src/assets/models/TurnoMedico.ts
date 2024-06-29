export interface TurnoMedico {
    id: number;
    codigo: string;
    fecha: string;
    hora: number;
    minutos: number;
    estado: TurnoMedicoEstadoEnum;
    motivoConsulta: string;
    recetaMedicaId: number;
    estaDisponible: boolean;
    medicoId: number;
    socioId: number;
}

export interface TurnoMedicoRequest {
    fecha: string;
    hora: number;
    minutos: number;
    motivoConsulta: string;
    medicoId: number;
    socioId: number;
}

export interface TurnoMedicoUpdateRequest {
    id: number;
    codigo: string;
    fecha: string;
    hora: number;
    minutos: number;
    estado: TurnoMedicoEstadoEnum;
    motivoConsulta: string;
    recetaMedicaId: number;
    medicoId: number;
    socioId: number;
}

export interface TurnoMedicoResponse {
    id: number;
    codigo: string;
    fecha: string;
    hora: number;
    minutos: number;
    estado: TurnoMedicoEstadoEnum;
    motivoConsulta: string;
    recetaMedicaId: number;
    estaDisponible: boolean;
    medicoId: number;
    socioId: number;
}

export enum TurnoMedicoEstadoEnum {
    PENDIENTE = 'PENDIENTE',
    CANCELADA = 'CANCELADA',
    COMPLETADA = 'COMPLETADA'
}