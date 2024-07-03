import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const SeccionServicios = () => {
    return (
        <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">
                        Nuestros Servicios
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, height: 150 }}>
                                <AddReactionIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Atención Medica
                                </Typography>
                                <Typography variant="body1">
                                    Brindamos consultas médicas generales para diagnóstico y
                                    tratamiento de enfermedades comunes.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <SchoolIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Especialidades Médicas
                                </Typography>
                                <Typography variant="body1">
                                    Contamos con especialistas en diversas áreas como cardiología,
                                    pediatría, y ginecología.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Laboratorios y Diagnóstico
                                </Typography>
                                <Typography variant="body1">
                                    Ofrecemos servicios de análisis clínicos y estudios de
                                    diagnóstico por imagen.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <PsychologyIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Salud Mental
                                </Typography>
                                <Typography variant="body1">
                                    Proveemos apoyo psicológico y psiquiátrico para el bienestar
                                    emocional de nuestros afiliados.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <GppMaybeIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Programas de Prevención
                                </Typography>
                                <Typography variant="body1">
                                    Implementamos campañas y talleres para la prevención de
                                    enfermedades y promoción de hábitos saludables.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <AirportShuttleIcon color="primary" sx={{ fontSize: 50 }} />
                                <Typography variant="h5" gutterBottom>
                                    Atención Domiciliaria
                                </Typography>
                                <Typography variant="body1">
                                    Facilitamos servicios médicos y de enfermería a domicilio para
                                    pacientes con movilidad reducida o necesidades especiales.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    )
}

export default SeccionServicios;