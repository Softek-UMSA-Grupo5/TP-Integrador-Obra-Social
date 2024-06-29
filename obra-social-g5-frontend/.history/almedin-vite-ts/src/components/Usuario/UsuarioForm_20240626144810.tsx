import React, { useState } from 'react';
import {
    TextField,
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
        <Card sx={{ mx: 90, maxWidth: 700, my: 5, fontFamily: 'Roboto', alignContent: 'center' }}>
            <CardHeader
                title="Registrar usuario"
                subheader="Complete los campos para registrar un nuevo usuario"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Nombre de Usuario
                            </InputLabel>
                            <OutlinedInput
                                name="username"
                                type="text"
                                value={usuarioData.username}
                                label="Nombre de usuario"
                                onChange={handleChange}
                                sx={{ my: 1, maxHeight: 40 }}
                                placeholder="Ingrese el nombre de usuario.."
                                fullWidth
                                required
                            />
                        </FormControl>
                    </Grid>
                    {/* <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={usuarioData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    /> */}
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={usuarioData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={usuarioData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="rol-label">Rol</InputLabel>
                        <Select
                            labelId="rol-label"
                            id="rol"
                            value={selectedRol}
                            onChange={(e) => setSelectedRol(e.target.value as UsuarioRolesEnum)}
                            label="Rol">
                            <MenuItem value={UsuarioRolesEnum.ROL_SOCIO}>Socio</MenuItem>
                            <MenuItem value={UsuarioRolesEnum.ROL_ADMIN}>Admin</MenuItem>
                            <MenuItem value={UsuarioRolesEnum.ROL_RECEPCIONISTA}>
                                Recepcionista
                            </MenuItem>
                            <MenuItem value={UsuarioRolesEnum.ROL_MEDICO}>Médico</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Registrar Usuario
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Usuario registrado con éxito</p>}
                </form>
            </CardContent>
        </Card>
    );
};

export default UsuarioForm;
