import React from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Medico } from '../../types/Medico';

interface MedicoFormularioNuevoProps {
    medicoData: Medico;
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
                        value={
                            medicoData.dni !== undefined && medicoData.dni !== 0
                                ? medicoData.dni.toString()
                                : ''
                        }
                        onChange={handleMedicoDataChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el Dni del médico sin puntos.."
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 1,
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
                        placeholder="Ingrese el CUIL del médico sin guiones.."
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
