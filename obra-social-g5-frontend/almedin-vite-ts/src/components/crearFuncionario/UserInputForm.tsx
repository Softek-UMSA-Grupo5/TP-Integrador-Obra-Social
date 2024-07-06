import { FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { UsuarioRequestDto } from '../../assets/models/Usuario';

interface props {
    usuarioData: UsuarioRequestDto;
    handleUsuarioData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserInputForm({
    usuarioData,
    handleUsuarioData,
}: props): React.ReactElement {
    return (
        <>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Nombre de Usuario</InputLabel>
                    <OutlinedInput
                        name="username"
                        placeholder="Nombre de usuario"
                        value={usuarioData.username}
                        onChange={handleUsuarioData}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        required
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Constraseña</InputLabel>
                    <OutlinedInput
                        name="password"
                        type="password"
                        placeholder="Constraseña"
                        value={usuarioData.password}
                        onChange={handleUsuarioData}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        required
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                        name="email"
                        value={usuarioData.email}
                        onChange={handleUsuarioData}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Email"
                        required
                    />
                </FormControl>
            </Grid>
        </>
    );
}
