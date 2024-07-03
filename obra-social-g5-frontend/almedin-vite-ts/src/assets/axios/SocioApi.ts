import api from './api';

export async function getSocioById(id: Number) {
    try {
        const response = await api.get(`/socios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el socio:', error);
    }
}
