import { Container, Typography } from '@mui/material'
import EstadoSelect from './EstadoSelector';
import TurnoCardsGrid from './TurnoCardsGrid';

function ListaTurnosSocio() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', margin: '20px 0 20px' }} variant="h4" component="h1">Mis turnos</Typography>
            <EstadoSelect />
            <TurnoCardsGrid />
        </Container>
    );
}

export default ListaTurnosSocio;