import Card from '@mui/material/Card';
import AppointmentCard from './AppointmentCard';
import '../../assets/styles/crearTurnoMedico.css';
import { Box } from '@mui/material/';

function CrearTurnoMedico() {
    return (
        <Box sx={{ maxWidth: 700, margin: 'auto', my: 5 }}>
            <Card variant="outlined">
                <AppointmentCard />
            </Card>
        </Box>
    );
}

export default CrearTurnoMedico;
