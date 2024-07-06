import { UsuarioResponseDto } from "./Usuario";

export interface Recepcionista {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    estaEliminado: boolean;
    usuario: UsuarioResponseDto;
}

export interface RecepcionistaUpdateRequestDto {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: Date;
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
    fechaNacimiento: Date;
    estaEliminado: boolean;
    usuarioId: number | undefined; 
}

export interface RecepcionistaRequestDto {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: string;
    fechaNacimiento: Date;
    cuil: string;
    usuarioId: number | undefined;
}
