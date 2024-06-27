import { Container, Grid, Typography } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';


const SeccionSobreNosotros = () => {
    return(
        <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom align="left">
                            Sobre Nosotros
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            En Almedin, nos dedicamos a brindar atención de salud integral y
                            accesible a toda la comunidad. Con un enfoque en la prevención, el
                            diagnóstico temprano y el tratamiento efectivo, nuestro objetivo es
                            mejorar la calidad de vida de nuestros afiliados. Creemos en un sistema
                            de salud inclusivo y equitativo, donde cada persona tenga acceso a
                            servicios de salud de alta calidad sin importar su situación económica.
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            Trabajamos día a día con un equipo comprometido de profesionales de la
                            salud para asegurar que recibas el mejor cuidado posible y el apoyo
                            necesario para vivir una vida saludable y plena.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ApartmentIcon sx={{ fontSize: 350 }} />
                    </Grid>
                </Grid>
            </Container>
    )
}

export default SeccionSobreNosotros;