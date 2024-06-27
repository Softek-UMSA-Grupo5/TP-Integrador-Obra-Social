import axios from 'axios';

export async function getUbicaciones(token: String) {
    try {
        const response = await axios.get('http://localhost:8080/ubicaciones', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error al obtener las ubicaciones: ', error);
    }
}
