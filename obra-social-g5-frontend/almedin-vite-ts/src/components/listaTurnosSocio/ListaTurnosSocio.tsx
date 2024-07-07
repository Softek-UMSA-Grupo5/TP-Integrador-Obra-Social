import { Container, SelectChangeEvent, Typography } from '@mui/material';
import EstadoSelect from './EstadoSelect';
import TurnoCardsGrid from './TurnoCardsGrid';
import React from 'react';
import { TurnoMedicoEstadoEnum } from '../../assets/models/TurnoMedico';

function ListaTurnosSocio() {
    const [estado, setEstado] = React.useState<TurnoMedicoEstadoEnum>(TurnoMedicoEstadoEnum.PENDIENTE);

    const handleSetEstado = (event: SelectChangeEvent<TurnoMedicoEstadoEnum>) => {
        setEstado(event.target.value as TurnoMedicoEstadoEnum);
    };
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography
                sx={{ fontWeight: 'bold', margin: '20px 0 20px' }}
                variant="h4"
                component="h1">
                Mis turnos
            </Typography>
            <EstadoSelect estado={estado} handleSetEstado={handleSetEstado}/>
            <TurnoCardsGrid estado={estado}/>
        </Container>
    );
}

export default ListaTurnosSocio;
