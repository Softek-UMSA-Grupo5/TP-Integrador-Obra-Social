import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { ReactNode } from 'react';

export default function SeccionServicios() {
    return (
        <Box id="servicios" sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom align="center">
                    Nuestros Servicios
                </Typography>
                <Grid container spacing={4}>
                    {servicios.map((servicio, index) => (
                        <Servicio
                            key={index}
                            icono={servicio.icono}
                            servicio={servicio.servicio}
                            texto={servicio.texto}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

interface Servicio {
    icono: ReactNode;
    servicio: string;
    texto: string;
}

const Servicio: React.FC<Servicio> = ({ icono, servicio, texto }) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    {icono}
                    <Typography variant="h5" gutterBottom>
                        {servicio}
                    </Typography>
                    <Typography variant="body1">{texto}</Typography>
                </Paper>
            </Grid>
        </>
    );
};

const servicios = [
    {
        icono: <AddReactionIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Atención Medica',
        texto: 'Brindamos consultas médicas generales para diagnóstico y tratamiento de enfermedades comunes.',
    },
    {
        icono: <SchoolIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Especialidades Médicas',
        texto: 'Contamos con especialistas en diversas áreas como cardiología, pediatría, y ginecología.',
    },
    {
        icono: <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Laboratorios y Diagnóstico',
        texto: 'Ofrecemos servicios de análisis clínicos y estudios de diagnóstico por imagen.',
    },
    {
        icono: <PsychologyIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Salud Mental',
        texto: 'Proveemos apoyo psicológico y psiquiátrico para el bienestar emocional de nuestros afiliados.',
    },
    {
        icono: <GppMaybeIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Programas de Prevención',
        texto: 'Implementamos campañas y talleres para la prevención de enfermedades y promoción de hábitos saludables.',
    },
    {
        icono: <AirportShuttleIcon color="primary" sx={{ fontSize: 50 }} />,
        servicio: 'Atención Domiciliaria',
        texto: 'Facilitamos servicios médicos y de enfermería a domicilio para pacientes con movilidad reducida o necesidades especiales.',
    },
];
