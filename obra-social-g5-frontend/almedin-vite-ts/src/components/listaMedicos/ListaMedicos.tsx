import { Container, SelectChangeEvent, Typography } from '@mui/material';
import SelectorsGrid from './SelectorsGrid';
import CardsGrid from './CardsGrid';
import React from 'react';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { getAllMedicos } from '../../assets/axios/MedicoApi';
import { getAllConsultorios } from '../../assets/axios/ConsultorioApi';
import { MedicoResponseDto } from '../../assets/models/Medico';

const ListaMedicos: React.FC = () => {
    const [especialidad, setEspecialidad] = React.useState<string>("General");
    const [ubicacion, setUbicacion] = React.useState<string>("Todos");
    const handleSetEspecialidad = (event: SelectChangeEvent<string>) => {
        setEspecialidad(event.target.value);
        handleSetFiltro(event.target);
    }
    const handleSetUbicacion = (event: SelectChangeEvent<string>) => {
        setUbicacion(event.target.value);
        handleSetFiltro(event.target);
    }
    const handleSetFiltro = (event: SelectChangeEvent<string>) => {
        let medicosAuxiliar=existingMedicos.slice();
        if(event.name==="especialidad" && event.value!=="General"){
            medicosAuxiliar=medicosAuxiliar.filter(m => m[event.name] === event.value);
            setMedicosFiltrados(medicosAuxiliar);
            return;
        }
        setMedicosFiltrados(medicosAuxiliar);
    };

    const [existingMedicos, setExistintMedicos] = React.useState<MedicoResponseDto[]>([]);
    const [existingConsultorios, setExistintConsultorios] = React.useState<
        ConsultorioResponseDto[]
    >([]);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    const [medicosFiltrados, setMedicosFiltrados] = React.useState<MedicoResponseDto[]>([]);

    React.useEffect(() => {
        getAllMedicos()
            .then((response) => {setExistintMedicos(response); setMedicosFiltrados(response)})
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
            <SelectorsGrid especialidad={especialidad} handleSetEspecialidad={handleSetEspecialidad} />
            <CardsGrid medicos={medicosFiltrados} existingConsultorios={existingConsultorios} />
        </Container>
    );
};

export default ListaMedicos;