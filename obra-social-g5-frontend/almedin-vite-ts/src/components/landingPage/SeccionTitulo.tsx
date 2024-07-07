import { Container, Typography } from "@mui/material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';


const SeccionTitulo = () => {
    return(
        <Container id="titulo" maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    Bienestar Integral para Todos
                </Typography>
                <Typography variant="h5" paragraph>
                    Tu salud es nuestra prioridad, juntos construimos un futuro más saludable y
                    seguro
                </Typography>
                <VolunteerActivismIcon sx={{ fontSize: 150 }} />
            </Container>
    )
}

export default SeccionTitulo;