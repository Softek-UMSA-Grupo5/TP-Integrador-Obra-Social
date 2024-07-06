// HorarioItem.tsx

import React from 'react';
import { FormControl, Grid,IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horario, HorarioDiaSemanaEnum } from '../../assets/models/Horario';
import InputField from '../crearMedico/InputField';

interface HorarioItemProps {
    horario: Horario;
    index: number;
    handleSelectChange: (index: number, value: string) => void;
    handleTimeChange: (index: number, type: 'inicio' | 'fin', value: string) => void;
    handleRemoveHorario: (index: number) => void;
}

const HorarioItem: React.FC<HorarioItemProps> = ({
    horario,
    index,
    handleSelectChange,
    handleTimeChange,
    handleRemoveHorario,
}) => {
    return (
        <Grid container spacing={1} my={1.5} justifyContent="center">
            <Grid item xs={12} sm={12} md={3}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Día de la Semana
                    </InputLabel>
                    <Select
                        name={`dia-semana-${index}`}
                        value={horario.diaSemana}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        onChange={(event) => handleSelectChange(index, event.target.value as string)}
                    >
                        {Object.values(HorarioDiaSemanaEnum).map((dia) => (
                            <MenuItem key={dia} value={dia}>
                                {dia}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <InputField
                    name={`hora-inicio-${index}`}
                    label="Hora Inicio"
                    value={horario.horaInicio.substring(0, 5)}
                    onChange={(e: { target: { value: string; }; }) => handleTimeChange(index, 'inicio', e.target.value)}
                    type="time"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <InputField
                    name={`hora-fin-${index}`}
                    label="Hora Fin"
                    value={horario.horaFin.substring(0, 5)}
                    onChange={(e: { target: { value: string; }; }) => handleTimeChange(index, 'fin', e.target.value)}
                    type="time"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={1} alignContent={'center'}>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveHorario(index)}
                    size="large"
                    sx={{ '&:hover': { color: 'red' } }}
                >
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default HorarioItem;
