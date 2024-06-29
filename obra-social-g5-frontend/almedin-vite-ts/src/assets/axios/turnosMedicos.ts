import axios from 'axios';

export async function getTurnosMedicos(token: String) {
    try {
        const response = await axios.get('http://localhost:8080/turnoMedico', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error al obtener los turnos médicos: ', error);
    }
}

export async function postTurnoMedico(json: {}, token: String) {
    try {
        await axios.post('http://localhost:8080/turnoMedico', json, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error añadiendo turno médico:', error);
    }
}
