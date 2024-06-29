import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../types';
import { registrarUsuario } from '../../axios/UsuarioApi';

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: ''
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ value: unknown }>) => {
        const { name, value } = e.target;
        setUsuarioData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await registrarUsuario(usuarioData, selectedRol);
            setSuccess(true);
            // Lógica adicional después del registro exitoso
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={usuarioData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
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
                    label="Rol"
                >
                    <MenuItem value={UsuarioRolesEnum.ROL_SOCIO}>Socio</MenuItem>
                    <MenuItem value={UsuarioRolesEnum.ROL_ADMIN}>Admin</MenuItem>
                    <MenuItem value={UsuarioRolesEnum.ROL_RECEPCIONISTA}>Recepcionista</MenuItem>
                    <MenuItem value={UsuarioRolesEnum.ROL_MEDICO}>Médico</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Registrar Usuario
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Usuario registrado con éxito</p>}
        </form>
    );
};

export default UsuarioForm;
