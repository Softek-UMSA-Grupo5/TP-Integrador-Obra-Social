import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { requestPasswordReset, resetPassword } from './api'; // Importar funciones de API

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async () => {
        /*try {
            await requestPasswordReset(email);
            setMessage('Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.');
        } catch (error) {
            setMessage('Error al solicitar la recuperación de contraseña.');
        }*/
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
                        <Typography component="h1" variant="h5">
                            ¿Olvidaste tu contraseña?
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, mt: 2 }}
                            color="text.secondary"
                            gutterBottom
                            align="left">
                            Ingrese su email, se le enviará un mail con las instrucciones para
                            cambiar su contraseña
                        </Typography>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button sx={{mt: 2}} fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                    {message && <Typography>{message}</Typography>}
                </Box>
            </Container>
        </div>
    );
};

export default ForgotPassword;
