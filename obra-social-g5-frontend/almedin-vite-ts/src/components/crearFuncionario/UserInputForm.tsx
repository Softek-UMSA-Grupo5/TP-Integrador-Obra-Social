import { FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import { UsuarioRequestDto } from "../../assets/models/Usuario";

interface props {
    usuarioData: UsuarioRequestDto;
    handleUsuarioData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserInputForm({usuarioData, handleUsuarioData}: props): React.ReactElement {
const formFields = [
    { name: 'username', label: 'Nombre de Usuario', type: 'text', placeholder: 'Nombre de usuario', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Contraseña', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', required: true },
];
    
   return (
        <>
            {formFields.map((field) => (
                <Grid item xs={12} key={field.name}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>{field.label}</InputLabel>
                        <OutlinedInput
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={usuarioData[field.name as keyof UsuarioRequestDto]}
                            onChange={handleUsuarioData}
                            sx={{ my: 1.5, maxHeight: 40 }}
                            required={field.required}
                        />
                    </FormControl>
                </Grid>
            ))}
        </>
    );
}
