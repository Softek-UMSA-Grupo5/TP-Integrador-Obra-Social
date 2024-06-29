import React from 'react';
import {
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

interface MedicoFormularioNuevoProps {
    medicoData: {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        dni: string;
        fechaNacimiento: string;
        cuil: string;
        especialidad: string;
    };
    handleMedicoDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicoNuevoForm: React.FC<MedicoFormularioNuevoProps> = ({
    medicoData,
    handleMedicoDataChange,
}) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Nombre
                    </InputLabel>
                    <OutlinedInput
                        name="nombre"
                        value={medicoData.nombre}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el nombre del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Apellido
                    </InputLabel>
                    <OutlinedInput
                        name="apellido"
                        value={medicoData.apellido}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el apellido del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Teléfono
                    </InputLabel>
                    <OutlinedInput
                        name="telefono"
                        value={medicoData.telefono}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el teléfono del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Email
                    </InputLabel>
                    <OutlinedInput
                        name="email"
                        value={medicoData.email}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el email del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        DNI
                    </InputLabel>
                    <OutlinedInput
                        name="dni"
                        type="text"
                        value={medicoData.dni}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el DNI del médico"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Fecha de Nacimiento
                    </InputLabel>
                    <OutlinedInput
                        name="fechaNacimiento"
                        type="date"
                        value={medicoData.fechaNacimiento}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la fecha de nacimiento del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        CUIL
                    </InputLabel>
                    <OutlinedInput
                        name="cuil"
                        value={medicoData.cuil}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el CUIL del médico"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Especialidad
                    </InputLabel>
                    <OutlinedInput
                        name="especialidad"
                        value={medicoData.especialidad}
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la especialidad del médico"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default MedicoNuevoForm;