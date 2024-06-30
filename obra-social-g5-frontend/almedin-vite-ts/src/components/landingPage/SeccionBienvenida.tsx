import { Container, Typography } from '@mui/material';
import { useUser } from '../../assets/contexts/UserContext';

interface props {
    nombre: string;
    apellido: string;
}

export default function SeccionBienvenida({ nombre, apellido }: props) {
    const { user } = useUser();
    return (
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
                {user?.rol === 'ROL_ADMIN'
                    ? `Bienvenido ${user?.username}`
                    : `Bienvenido ${nombre + ' ' + apellido}`}
            </Typography>
            <Typography variant="h5" paragraph>
                Tu salud es nuestra prioridad, juntos construimos un futuro más saludable y seguro
            </Typography>
        </Container>
    );
}
