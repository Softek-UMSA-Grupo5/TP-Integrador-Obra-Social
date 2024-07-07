import * as React from 'react';
import { TextField, Button, Typography, Link, Container, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import tieneCamposVacios from '../../utils/tieneCamposVacios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../assets/contexts/UserContext';
import { getUserInfo, login } from '../../assets/axios/UsuarioApi';

const UserLogin = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
    const { setUser } = useUser();
    const navigate = useNavigate();
    const user = {
        id: null,
        rol: null,
        username: null,
        userData: null,
    };

    const submitLogin = async () => {
        let errors = tieneCamposVacios({ username, password });
        if (errors.length !== 0) {
            setEmptyFields(errors);
            return;
        }
        login({ username, password })
            .then((response) => {
                localStorage.setItem('token', response.token);
                user.id = response?.id;
                user.rol = response?.rol;
                user.username = response?.username;
                getUserInfo({
                    id: user.id,
                    username: user.username,
                    rol: user.rol,
                })
                    .then((response) => {
                        user.userData = response;
                        setUser(user);
                    })
                    .then(() => navigate('/'));
            })
            .catch(() =>
                toast.error('Usuario o Contraseña incorrecta', {
                    position: 'bottom-right',
                })
            );
    };

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                submitLogin();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [username, password]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        maxWidth: 400,
                        p: 4,
                        borderRadius: 10,
                        boxShadow: 3,
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}>
                        <LocalHospitalIcon
                            sx={{
                                fontSize: 75,
                                textAlign: 'center',
                            }}
                        />
                        <Typography component="h1" variant="h4" align="center">
                            Almedin
                        </Typography>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nombre de usuario"
                        name="usuario"
                        autoComplete="username"
                        autoFocus
                        error={emptyFields.some((elem) => elem === 'username')}
                        helperText={
                            emptyFields.some((elem) => elem === 'username') && 'El campo está vacío'
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(event.target.value)
                        }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contraseña"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={emptyFields.some((elem) => elem === 'password')}
                        helperText={
                            emptyFields.some((elem) => elem === 'password') && 'El campo está vacío'
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={submitLogin}>
                        Iniciar Sesión
                    </Button>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Link href="/forgotpassword" variant="body2">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </Box>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default UserLogin;
