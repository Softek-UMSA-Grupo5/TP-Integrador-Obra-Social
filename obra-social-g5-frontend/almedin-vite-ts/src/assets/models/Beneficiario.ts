import { Socio } from "./Socio";

export interface Beneficiario {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
    socio: Socio;
}

export interface BeneficiarioRequest {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
}

export interface BeneficiarioUpdateRequest {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
}

export interface BeneficiarioResponse {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
    estaEliminado: boolean;
    socio: number;
}