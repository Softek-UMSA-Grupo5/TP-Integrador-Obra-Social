import { UsuarioRolesEnum } from "../assets/models/Usuario";

export function formatearRol(rol: UsuarioRolesEnum) {
    const formatRol = rol.replace('ROL_', '').toLowerCase();
    return formatRol;
}