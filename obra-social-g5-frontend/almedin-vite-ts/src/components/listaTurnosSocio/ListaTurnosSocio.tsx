import { Container } from '@mui/material'
import EstadoSelect from './EstadoSelector';
import TurnoCardsGrid from './TurnoCardsGrid';

function ListaTurnosSocio() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Mis Turnos</h1>
            <EstadoSelect />
            <TurnoCardsGrid />
        </Container>
    );
}

export default ListaTurnosSocio;