//import { UsuarioResponseDto } from "./Usuario";

export interface Recepcionista {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: string;
    estaEliminado: boolean;
    usuario: number;
}

export interface RecepcionistaUpdateRequestDto {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
}

export interface RecepcionistaResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: string;
    estaEliminado: boolean;
    usuarioId: number | undefined; 
}

export interface RecepcionistaRequestDto {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: string;
    fechaNacimiento: string;
    cuil: string;
    usuarioId: number | undefined;
}
