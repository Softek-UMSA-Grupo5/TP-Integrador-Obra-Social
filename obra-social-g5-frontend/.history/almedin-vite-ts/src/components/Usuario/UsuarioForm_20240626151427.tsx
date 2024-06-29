import React, { useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardHeader,
    CardContent,
    Grid,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../types/Usuario';
import { registrarUsuario } from '../../axios/UsuarioApi';

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ value: unknown }>
    ) => {
        const { name, value } = e.target as HTMLInputElement;
        setUsuarioData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await registrarUsuario(usuarioData, selectedRol);
            setSuccess(true);
        } catch (error) {
            setError('Error al registrar el usuario');
        }
    };

    return (
        <Card sx={{ m: 90,p: 5, maxWidth: 700, my: 5, fontFamily: 'Roboto', alignContent: 'center' }}>
            <CardHeader
                title="Registrar usuario"
                subheader="Complete los campos para registrar un nuevo usuario"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Nombre de Usuario
                            </InputLabel>
                            <OutlinedInput
                                name="username"
                                type="text"
                                value={usuarioData.username}
                                onChange={handleChange}
                                sx={{ my: 1.5, maxHeight: 40 }}
                                placeholder="Ingrese el nombre de usuario.."
                                fullWidth
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Contraseña
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="password"
                                value={usuarioData.password}
                                onChange={handleChange}
                                sx={{ my: 1.5, maxHeight: 40 }}
                                placeholder="Ingrese la contraseña.."
                                fullWidth
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Email
                            </InputLabel>
                            <OutlinedInput
                                name="email"
                                type="text"
                                value={usuarioData.email}
                                onChange={handleChange}
                                sx={{ my: 1.5, maxHeight: 40 }}
                                placeholder="Ingrese el email.."
                                fullWidth
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Rol
                            </InputLabel>
                            <Select
                                name="rol"
                                value={selectedRol}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(e) =>
                                    setSelectedRol(e.target.value as UsuarioRolesEnum)
                                }>
                                {Object.values(UsuarioRolesEnum).map((rol) => (
                                    <MenuItem key={rol} value={rol}>
                                        {rol.substring(4).toLowerCase()}{' '}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mx: 12, mt: 3 }}>
                        Registrar Usuario
                    </Button>
                    {error && <Typography variant="body1" color="error" sx={{ textAlign: 'center', my: 2 }}>{error}</Typography>}
                    {success && <Typography variant="body1" color="error" sx={{ textAlign: 'center', my: -1 }}>Usuario registrado con éxito</Typography>}
                </form>
            </CardContent>
        </Card>
    );
};

export default UsuarioForm;
