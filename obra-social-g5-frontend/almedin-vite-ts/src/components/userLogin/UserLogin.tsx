import * as React from 'react';
import { TextField, Button, Typography, Link, Container, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Usuario } from '../../types';
import { login } from '../../assets/axios/usuarios';
import { navigate, redirect, useNavigate } from 'react-router-dom';

const json : Usuario = {
    username: "",
    password: ""
}

const UserLogin = () => {

    const [username, setUsername] = React.useState<null | string>(null);
    const [password, setPassword] = React.useState<null | string>(null);
    const navigate = useNavigate();

    const submitLogin = async () => {
        json.username = username;
        json.password = password;
        login(json).then(response => localStorage.setItem('token', response.token)).then(() => navigate('/'));
    };

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
                <Box sx={{
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 10,
                    boxShadow: 3
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}>
                        <LocalHospitalIcon sx={{
                            fontSize: 75,
                            textAlign: 'center',
                        }} />
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event?.target.value)}
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event?.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={submitLogin}>
                        Iniciar Sesion
                    </Button>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                        <Link href="#" variant="body2">
                            Olvidaste tu constraseña?
                        </Link>
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default UserLogin;
