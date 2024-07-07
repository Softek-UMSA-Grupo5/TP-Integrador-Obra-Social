import { Container, Typography } from '@mui/material';

interface props {
    nombre: string | undefined;
    apellido: string | undefined;
}

export default function SeccionBienvenida({ nombre = 'Admin', apellido = ''}: props) {
    return (
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
               
                    Bienvenido {nombre + ' ' + apellido}
            </Typography>
            <Typography variant="h5" paragraph>
                Tu salud es nuestra prioridad, juntos construimos un futuro más saludable y seguro
            </Typography>
        </Container>
    );
}
