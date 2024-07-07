import { Container, Grid, Typography } from '@mui/material';
import TurnoCard from './TurnoCard';
import React from 'react';
import { getTurnosMedicosSocio } from '../../assets/axios/TurnoMedicoApi';
import { useUser } from '../../assets/contexts/UserContext';
import { TurnoMedicoEstadoEnum, TurnoMedicoResponse } from '../../assets/models/TurnoMedico';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { getAllMedicos } from '../../assets/axios/MedicoApi';

interface props {
    estado: TurnoMedicoEstadoEnum;
}

export default function TurnoCardsGrid({estado}: props) {
    const { user } = useUser();
    const [turnosMedicos, setTurnosMedicos] = React.useState<TurnoMedicoResponse[]>([]);
    const [medicos, setMedicos] = React.useState<MedicoResponseDto[]>([]);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        getAllMedicos()
            .then((response) => setMedicos(response))
            .then(() =>
                getTurnosMedicosSocio(user?.userData.id).then((response) => {
                    setTurnosMedicos(response);
                })
            )
            .then(() => setIsLoaded(true));
    }, []); //falta actualizar la lista al cancelar turno

    return (
        <Container sx={{ marginBottom: '40px' }}>
            <Grid container spacing={2}>
                {isLoaded ?
                    turnosMedicos.filter((turno) => turno.estado === estado).map((turno, index) => (
                        <TurnoCard
                            key={index}
                            turnoMedico={turno}
                            medico={medicos.find((medico) => medico.id === turno.medicoId)}
                        />
                    )): <Typography>Cargando...</Typography>}
            </Grid>
        </Container>
    );
}
