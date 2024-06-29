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
    id: number;                // En TypeScript, Long se mapea a number
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: string;   // Date en Java se puede mapear a string (ISO 8601) en TypeScript
    estaEliminado: boolean;
    especialidad: string;
}
interface MedicoRequestDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string; // Aquí debes ajustar el tipo según cómo se maneje en tu backend (puede ser string o Date)
  cuil: string;
  especialidad: string;
  consultoriosId?: number[]; // El campo consultoriosId es opcional
}
