import { Container, Typography } from '@mui/material';
import SelectorsGrid from './SelectorsGrid';
import CardsGrid from './CardsGrid';
import React from 'react';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { getAllMedicos } from '../../assets/axios/MedicoApi';
import { getAllConsultorios } from '../../assets/axios/ConsultorioApi';


const ListaMedicos: React.FC = () => {
    const [existingMedicos, setExistintMedicos] = React.useState<MedicoResponseDto[]>([]);
    const [existingConsultorios, setExistintConsultorios] = React.useState<
        ConsultorioResponseDto[]
    >([]);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        getAllMedicos()
            .then((response) => setExistintMedicos(response))
            .then(() =>
                getAllConsultorios()
                    .then((response) => setExistintConsultorios(response))
                    .then(() => setIsLoaded(true))
            );
    }, []);

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
                Lista de Médicos
            </Typography>
            <SelectorsGrid />
            {isLoaded ? (
                <CardsGrid
                    existingMedicos={existingMedicos}
                    existingConsultorios={existingConsultorios}
                />
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Container>
    );
};

export default ListaMedicos;
