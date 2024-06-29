import React, { useState, useEffect } from 'react';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Button,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horario, HorarioDiaSemanaEnum } from '../../models/Horario';
import { generateTimeOptions } from '../../utils/ConsultorioUtils';

interface HorarioFormProps {
    horarioAtencion: Horario[];
    handleSelectChange: (index: number, value: string) => void;
    handleTimeChange: (index: number, type: 'inicio' | 'fin', value: string) => void;
    handleRemoveHorario: (index: number) => void;
    handleAddHorario: () => void;
}

const HorarioForm: React.FC<HorarioFormProps> = ({
    horarioAtencion,
    handleSelectChange,
    handleTimeChange,
    handleRemoveHorario,
    handleAddHorario,
}) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorVisible, setErrorVisible] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: number | null = null;

        if (errorVisible) {
            timeoutId = window.setTimeout(() => {
                setErrorMessage('');
                setErrorVisible(false);
            }, 2000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [errorVisible]);

    const handleRemoveHorarioWrapper = (index: number) => {
        if (horarioAtencion.length > 1) {
            handleRemoveHorario(index);
            setErrorMessage(''); 
            setErrorVisible(false);
        } else {
            setErrorMessage('No se pueden borrar todos los horarios.'); 
            setErrorVisible(true);
        }
    };

    return (
        <>
            {horarioAtencion.map((horario, index) => (
                <Grid container spacing={1} key={index} mx={8} my={1} justifyContent="center">
                    <Grid item xs={12} sm={12} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Día de la Semana
                            </InputLabel>
                            <Select
                                name="diaSemana"
                                value={horario.diaSemana}
                                sx={{ my: 1, maxHeight: 40 }}
                                onChange={(event) =>
                                    handleSelectChange(index, event.target.value as string)
                                }>
                                {Object.values(HorarioDiaSemanaEnum).map((dia) => (
                                    <MenuItem key={dia} value={dia}>
                                        {dia}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
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
                                onChange={(e) =>
                                    handleTimeChange(index, 'inicio', e.target.value as string)
                                }>
                                {generateTimeOptions()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
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
                                onChange={(e) =>
                                    handleTimeChange(index, 'fin', e.target.value as string)
                                }>
                                {generateTimeOptions()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} alignContent={'center'} mx={{md: '25px'}}>
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
            <Grid item xs={12} sm={12} md={3} >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddHorario}>
                    Agregar Horario
                </Button>
            </Grid>
            {errorMessage && (
                <Typography variant="body1" color="error" sx={{ textAlign: 'center', my: -1 }}>
                    {errorMessage}
                </Typography>
            )}
        </>
    );
};

export default HorarioForm;
