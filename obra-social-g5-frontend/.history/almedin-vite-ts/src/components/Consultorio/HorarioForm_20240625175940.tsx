import React, { useState } from 'react';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horario, HorarioDiaSemanaEnum } from '../../types/Horario';
import { generateTimeOptions } from '../../utils/ConsultorioUtils';

interface HorarioFormProps {
    horarioAtencion: Horario[];
    handleSelectChange: (index: number, value: string) => void;
    handleTimeChange: (index: number, type: 'inicio' | 'fin', value: string) => void;
    handleRemoveHorario: (index: number) => void;
}

const HorarioForm: React.FC<HorarioFormProps> = ({
    horarioAtencion,
    handleSelectChange,
    handleTimeChange,
    handleRemoveHorario,
}) => {
    const [errors, setErrors] = useState<Record<number, string>>({});

    const validateForm = () => {
        let hasErrors = false;
        const newErrors: Record<number, string> = {};

        horarioAtencion.forEach((horario, index) => {
            if (!horario.diaSemana || !horario.horaInicio || !horario.horaFin) {
                newErrors[index] = 'Todos los campos son requeridos';
                hasErrors = true;
            }
        });

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleSelectChangeWrapper = (index: number, value: string) => {
        handleSelectChange(index, value);
        validateForm();
    };

    const handleTimeChangeWrapper = (index: number, type: 'inicio' | 'fin', value: string) => {
        handleTimeChange(index, type, value);
        validateForm();
    };

    const handleRemoveHorarioWrapper = (index: number) => {
        handleRemoveHorario(index);
        validateForm();
    };

    return (
        <>
            {horarioAtencion.map((horario, index) => (
                <Grid container spacing={1} key={index} mx={8} my={1} justifyContent="center">
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" error={!!errors[index]}>
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Día de la Semana
                            </InputLabel>
                            <Select
                                name="diaSemana"
                                value={horario.diaSemana}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(event) => handleSelectChangeWrapper(index, event.target.value as string)}>
                                {Object.values(HorarioDiaSemanaEnum).map((dia) => (
                                    <MenuItem key={dia} value={dia}>
                                        {dia}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors[index] && <FormHelperText>{errors[index]}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" error={!!errors[index]}>
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
                                onChange={(e) => handleTimeChangeWrapper(index, 'inicio', e.target.value as string)}>
                                {generateTimeOptions()}
                            </Select>
                            {errors[index] && <FormHelperText>{errors[index]}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" error={!!errors[index]}>
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
                                onChange={(e) => handleTimeChangeWrapper(index, 'fin', e.target.value as string)}>
                                {generateTimeOptions()}
                            </Select>
                            {errors[index] && <FormHelperText>{errors[index]}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveHorarioWrapper(index)}
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
