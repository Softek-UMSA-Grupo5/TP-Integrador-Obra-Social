import React from 'react';
import { Container, Grid } from '@mui/material';
import ConsultorioForm from '../components/Consultorio/CrearConsultorio';

const ConsultorioPage: React.FC = () => {
    
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <ConsultorioForm />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConsultorioPage;
