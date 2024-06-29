import axios from 'axios';

export async function getSocioById(id: Number, token: String) {
    try {
        const response = await axios.get(`http://localhost:8080/socios/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el socio:', error);
    }
}
