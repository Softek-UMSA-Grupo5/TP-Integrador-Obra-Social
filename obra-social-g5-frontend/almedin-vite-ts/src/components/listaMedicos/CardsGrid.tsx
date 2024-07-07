import { Container, Grid, Typography } from '@mui/material'
import MedicoCard from './MedicoCard';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import React from 'react';

interface MedicosExistentesProps {
    medicos: MedicoResponseDto[];
    existingConsultorios: ConsultorioResponseDto[];
}

const CardsGrid: React.FC<MedicosExistentesProps> = ({ medicos, existingConsultorios }) => {
    
    
    return(
        <Container sx={{ marginBottom: '40px' }}>
            <Grid container spacing={2}>
                {medicos.length!==0 ? 
                    medicos.map((medico, index) =>(
                        <MedicoCard 
                            key={index}
                            medico={medico}
                            existingConsultorios={existingConsultorios}
                        />
                    ))
                    : <Typography>Cargando...</Typography>}
            </Grid>
        </Container>
    );
}

export default CardsGrid;