import api from './api';
import { UsuarioLoginDto, UsuarioRequestDto, UsuarioRolesEnum } from '../models/Usuario';
import { User } from '../contexts/UserContext';

export const registrarUsuario = async (dto: UsuarioRequestDto, rol: UsuarioRolesEnum): Promise<void> => {
    try {
        const params = new URLSearchParams({ 'Rol+Usuario': rol });
        const response = await api.post(`/usuarios?${params.toString()}`, dto);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar el usuario');
    }
};

export async function login(json: UsuarioLoginDto) {
    try {
        const response = await api.post(`/usuarios/login`, json);
        return response.data;
    } catch (error) {
        console.log('Error al logear usuario: ', error);
    }
}

export async function refreshToken(json: User){
    try {
        const response = await api.post(`/usuarios/refresh`, json);
        return response.data;
    } catch (error) {
        console.log('Error al refrescar token: ', error);
    }
}

export async function getUserInfo(json: User){
    try {
        const response = await api.post(`/usuarios/info`, json);
        return response.data;
    } catch (error) {
        console.log('Error al obtener info de usuario: ', error);
    }
}
export const getUserByUsername = async (username: string) => {
    try {
        const response = await api.get(`/usuarios/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al buscar el usuario por nombre de usuario');
    }
};