export interface Medico {
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
  dni: number;
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
    dni: number;
    cuil: string;
    fechaNacimiento: string;
    estaEliminado: boolean;
    especialidad: string;
    usuario:number;
    consultoriosId: number[];
}
export interface MedicoRequestDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
  consultoriosId?: number[];
}
