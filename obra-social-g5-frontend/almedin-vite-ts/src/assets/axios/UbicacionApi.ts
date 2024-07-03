import api from './api';

export async function getUbicaciones() {
    try {
        const response = await api.get('/ubicaciones');
        return response.data;
    } catch (error) {
        console.log('Error al obtener las ubicaciones: ', error);
    }
}
