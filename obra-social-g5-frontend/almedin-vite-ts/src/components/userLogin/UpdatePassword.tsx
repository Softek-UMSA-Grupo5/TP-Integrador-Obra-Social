import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import tieneCamposVacios from '../../utils/tieneCamposVacios';
import { UsuarioLoginDto } from '../../assets/models/Usuario';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../assets/contexts/UserContext';
import { updateUserPassword } from '../../assets/axios/UsuarioApi';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
    const { user } = useUser();
    const navigate = useNavigate();

    const handleUpdatePassword = () => {
        let errors = tieneCamposVacios({ oldPassword, newPassword, confirmPassword });
        if (errors.length != 0) {
            setEmptyFields(errors);
            return;
        }
        if (oldPassword === newPassword) {
            toast.error('La nueva contraseña no puede ser igual a la anterior', {
                position: 'bottom-right',
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Las contraseña nueva y la de confirmación no coinciden', {
                position: 'bottom-right',
            });
            return;
        }
        const json: UsuarioLoginDto = {
            username: user?.username,
            password: oldPassword,
        };
        updateUserPassword(json, newPassword)
            .then(() => {
                toast.success('contraseña actualizada correctamente', {
                    position: 'bottom-right',
                });
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch(() =>
                toast.error('Algo salió mal al actualizar la contraseña', {
                    position: 'bottom-right',
                })
            );
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
                    <Typography sx={{ fontSize: 18 }} align="left" fontWeight={'bold'}>
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
                        error={emptyFields.some((elem) => elem === 'oldPassword')}
                        helperText={
                            emptyFields.some((elem) => elem === 'oldPassword') &&
                            'El campo está vacío'
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setOldPassword(event?.target.value)
                        }
                        sx={{ mt: 1 }}
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
                        error={emptyFields.some((elem) => elem === 'newPassword')}
                        helperText={
                            emptyFields.some((elem) => elem === 'newPassword') &&
                            'El campo está vacío'
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPassword(event?.target.value)
                        }
                        sx={{ mt: 1 }}
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
                        error={emptyFields.some((elem) => elem === 'confirmPassword')}
                        helperText={
                            emptyFields.some((elem) => elem === 'confirmPassword') &&
                            'El campo está vacío'
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setConfirmPassword(event?.target.value)
                        }
                        sx={{ mt: 1 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleUpdatePassword}
                        sx={{ mt: 2 }}>
                        Actualizar contraseña
                    </Button>
                </Box>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default UpdatePassword;
