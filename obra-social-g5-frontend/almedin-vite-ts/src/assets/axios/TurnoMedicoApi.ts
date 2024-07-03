import api from './api';
import { TurnoMedicoRequest } from '../models/TurnoMedico';

export async function getTurnosMedicos() {
    try {
        const response = await api.get('/turnoMedico');
        return response.data;
    } catch (error) {
        console.log('Error al obtener los turnos médicos: ', error);
    }
}

export async function postTurnoMedico(json: TurnoMedicoRequest) {
    try {
        await api.post('turnoMedico', json);
    } catch (error) {
        console.error('Error añadiendo turno médico:', error);
    }
}
