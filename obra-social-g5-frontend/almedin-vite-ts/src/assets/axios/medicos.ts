import axios from 'axios';

export async function getMedicos(token: String) {
    try {
        const response = await axios.get('http://localhost:8080/especialistas', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los medicos:', error);
    }
}
