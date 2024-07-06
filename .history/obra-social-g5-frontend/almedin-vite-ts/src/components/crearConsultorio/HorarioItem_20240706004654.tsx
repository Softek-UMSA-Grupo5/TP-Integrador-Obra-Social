// HorarioItem.tsx

import React from 'react';
import { Grid,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horario, HorarioDiaSemanaEnum } from '../../assets/models/Horario';
import InputField from '../crearMedico/InputField';
import GenericSelect from '../crearUsuario/GenericSelect';

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
     const handleRemoveHorarioWrapper = () => {
        handleRemoveHorario(index);
    };
    return (
        <Grid container spacing={1} my={0.5} justifyContent="center">
            <Grid item xs={12} sm={12} md={3}>
                <GenericSelect
                    items={Object.values(HorarioDiaSemanaEnum)}
                    selectedItem={Object.values(HorarioDiaSemanaEnum).findIndex(dia => dia === horario.diaSemana)}
                    handleSelectChange={(event) => handleSelectChange(index, event.target.value as string)}
                    itemLabel={(item) => item}
                    label="Día de la Semana"
                />
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
