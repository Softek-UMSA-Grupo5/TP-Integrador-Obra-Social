export interface Usuario {
    id: number;
    username: string;
    password: string;
    email: string;
    rol: UsuarioRolesEnum;
    estaEliminado: boolean;
}
export enum UsuarioRolesEnum {
    ROL_SOCIO = 'ROL_SOCIO',
    ROL_ADMIN = 'ROL_ADMIN',
    ROL_RECEPCIONISTA = 'ROL_RECEPCIONISTA',
    ROL_MEDICO = 'ROL_MEDICO'
}
export interface UsuarioRequestDto {
    rol: UsuarioRolesEnum;
    username: string;
    password: string;
    email: string;
}

export interface UsuarioLoginDto {
    username: string;
    password: string;
}
export interface UsuarioResponseDto {
    id: number;
    rol: UsuarioRolesEnum;
    username: string;
    token: string;
}