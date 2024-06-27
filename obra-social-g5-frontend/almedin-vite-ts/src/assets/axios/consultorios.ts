import axios from 'axios';

export async function getConsultorios(token: String) {
    try {
        const response = await axios.get('http://localhost:8080/consultorios', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los consultorios:', error);
    }
}
