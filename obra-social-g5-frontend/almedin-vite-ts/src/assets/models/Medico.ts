export interface Medico {
  id: number | undefined;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
  consultoriosId: number[];
}

export interface MedicoRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
  consultoriosId: number[];
}
export interface MedicoResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: string;
    cuil: string;
    fechaNacimiento: string;
    estaEliminado: boolean;
    especialidad: string;
    consultoriosId: number[];
    usuarioId?: number;
}
export interface MedicoRequestDto {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: string ;
    fechaNacimiento: string;
    cuil: string;
    especialidad: string;
    consultoriosId?: number[];
    usuarioId?: number; 
}
