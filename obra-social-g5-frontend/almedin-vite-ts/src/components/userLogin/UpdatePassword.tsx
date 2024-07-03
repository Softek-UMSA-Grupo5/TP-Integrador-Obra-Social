import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';

const UpdatePassword = () => {
    const [username, setUsername] = React.useState<null | string>(null);
    const [password, setPassword] = React.useState<null | string>(null);

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
                        <Typography component="h1" variant="h4" align="center" fontWeight={'bold'}>
                            Actualizar Contraseña
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, my: 2 }}
                            color="text.secondary"
                            gutterBottom
                            align="left">
                            Actualice su contraseña por motivos de seguridad al ser el primer inicio
                            de sesión
                        </Typography>
                    </div>
                    <Typography sx={{ fontSize: 18}} align="left" fontWeight={'bold'}>
                        Contraseña actual
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="old-password"
                        label="Ingrese contraseña actual"
                        name="old-password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(event?.target.value)
                        }
                        sx={{mt:1}}
                    />
                    <Typography sx={{ fontSize: 18, mt: 1 }} align="left" fontWeight={'bold'}>
                        Contraseña nueva
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="new-password"
                        label="Ingrese contraseña nueva"
                        type="password"
                        id="new-password"
                        autoComplete="current-password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event?.target.value)
                        }
                        sx={{mt:1}}
                    />
                    <Typography sx={{ fontSize: 18, mt: 1 }} align="left" fontWeight={'bold'}>
                        Confirmar contraseña nueva
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="new-password-repeated"
                        label="Confirmar contraseña nueva"
                        type="password"
                        id="new-password-repeated"
                        autoComplete="current-password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event?.target.value)
                        }
                        sx={{mt:1}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}>
                        Actualizar contraseña
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default UpdatePassword;
