import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>(new URLSearchParams(window.location.search).get('token') || '');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        /*try {
            await resetPassword(token, password);
            navigate('/login');
        } catch (error) {
            console.error('Error al restablecer la contraseña', error);
        }*/
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Restablecer Contraseña
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Nueva Contraseña"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                    Restablecer
                </Button>
            </Box>
        </Container>
    );
};

export default ResetPassword;