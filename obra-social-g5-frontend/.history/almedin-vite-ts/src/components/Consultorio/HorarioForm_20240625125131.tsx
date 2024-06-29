import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horario, HorarioDiaSemanaEnum } from '../../types/Horario';

interface HorarioFormProps {
    horarioAtencion: Horario[];
    handleSelectChange: (index: number, value: string) => void;
    handleTimeChange: (type: 'inicio' | 'fin', value: string) => void;
    handleRemoveHorario: (index: number) => void;
}
 const generateTimeOptions = () => {
        const options: JSX.Element[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const hourStr = String(hour).padStart(2, '0');
                const minuteStr = String(minute).padStart(2, '0');
                options.push(
                    <MenuItem key={`${hourStr}:${minuteStr}`} value={`${hourStr}:${minuteStr}`}>
                        {`${hourStr}:${minuteStr}`}
                    </MenuItem>
                );
            }
        }
        return options;
    };

const HorarioForm: React.FC<HorarioFormProps> = ({
    horarioAtencion,
    handleSelectChange,
    handleTimeChange,
    handleRemoveHorario,
}) => {
    return (
        <>
            {horarioAtencion.map((horario, index) => (
                <Grid container spacing={1} key={index} mx={8} my={1} justifyContent="center">
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Día de la Semana
                            </InputLabel>
                            <Select
                                name="diaSemana"
                                value={horario.diaSemana}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(event) => handleSelectChange(index, event.target.value as string)}>
                                {Object.values(HorarioDiaSemanaEnum).map((dia) => (
                                    <MenuItem key={dia} value={dia}>
                                        {dia}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel
                                htmlFor={`select-hora-inicio-${index}`}
                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                shrink>
                                Hora Inicio
                            </InputLabel>
                            <Select
                                labelId={`select-hora-inicio-label-${index}`}
                                id={`select-hora-inicio-${index}`}
                                value={horario.horaInicio.substring(0, 5)}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(e) => handleTimeChange('inicio', e.target.value as string)}>
                                {generateTimeOptions()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel
                                htmlFor={`select-hora-fin-${index}`}
                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                shrink>
                                Hora Fin
                            </InputLabel>
                            <Select
                                labelId={`select-hora-fin-label-${index}`}
                                id={`select-hora-fin-${index}`}
                                value={horario.horaFin.substring(0, 5)}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(e) => handleTimeChange('fin', e.target.value as string)}>
                                {generateTimeOptions()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveHorario(index)}
                            size="large"
                            sx={{ '&:hover': { color: 'red' } }}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default HorarioForm;
