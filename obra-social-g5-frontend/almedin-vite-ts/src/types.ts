export interface Medico {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    estaEliminado: boolean;
    especialidad: string;
}

export interface Beneficiario {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    estaEliminado: boolean;
    socio: Socio;
}

export interface Socio {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: Date;
    estaEliminado: boolean;
    nroAfiliado: string;
    beneficiarios: Beneficiario[];
}

export interface Consultorio {
    id: number;
    medicoId: number;
    ubicacion: Ubicacion;
    horarioAtencion: HorarioAtencion[];
    estaEliminado: boolean;
    codigo: string;
}

export interface Ubicacion {
    id: number;
    ciudad: string;
    provincia: string;
    calle: string;
    altura: number;
    estaEliminado: boolean;
    codigo: string;
}

export interface HorarioAtencion {
    id: number;
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    estaEliminado: boolean;
    codigo: String;
}


export interface TurnoMedico {
    id: number;
    codigo: string;
    fecha: string;
    hora: number;
    minutos: number;
    estado: string;
    motivoConsulta: string;
    recetaMedicaId: number;
    estaDisponible: boolean;
    medicoId: number;
    socioId: number;
}

export interface Usuario {
    username: string;
    password: string;
}