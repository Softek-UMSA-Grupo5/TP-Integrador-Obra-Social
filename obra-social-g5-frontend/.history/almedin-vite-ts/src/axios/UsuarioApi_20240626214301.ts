import api from './api';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../types/Usuario';

/* export const registrarUsuario = async (dto: UsuarioRequestDto, rol: UsuarioRolesEnum): Promise<void> => {
    try {
        const response = await api.post(`/usuarios?RolUsuario=${rol}`, dto);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar el usuario');
    }
}; */
export const registrarUsuario = async (dto: UsuarioRequestDto, rol: UsuarioRolesEnum): Promise<void> => {
    try {
        const params = new URLSearchParams({ 'Rol Usuario': rol });
        const response = await api.post(`/usuarios?${params.toString()}`, dto);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar el usuario');
    }
};
