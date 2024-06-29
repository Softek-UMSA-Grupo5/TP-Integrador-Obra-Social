import { Beneficiario, BeneficiarioRequest, BeneficiarioResponse, BeneficiarioUpdateRequest } from "./Beneficiario";

export interface Socio {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    nroAfiliado: string;
    beneficiarios: Beneficiario[];
}

export interface SocioRequest {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    beneficiarios: BeneficiarioRequest[];
}

export interface SocioUpdateRequest{
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    beneficiarios: BeneficiarioUpdateRequest[];
}

export interface SocioResponse {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    beneficiarios: BeneficiarioResponse[];
    estaEliminado: boolean;
}