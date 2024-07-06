import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import HorarioList from './HorarioList.tsx';
import { Horario } from '../../assets/models/Horario';
import { clearTimeout, setTimeout } from 'timers';

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

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (errorMessage) {
            timeoutId = setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }

    return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [errorMessage]);

    const handleRemoveHorarioWrapper = (index: number) => {
        if (horarioAtencion.length > 1) {
            handleRemoveHorario(index);
        } else {
            setErrorMessage('No se pueden borrar todos los horarios.');
        }
    };

    return (
        <Grid container spacing={2}>
            <HorarioList
                horarioAtencion={horarioAtencion}
                handleSelectChange={handleSelectChange}
                handleTimeChange={handleTimeChange}
                handleRemoveHorario={handleRemoveHorarioWrapper}
                handleAddHorario={handleAddHorario}
                errorMessage={errorMessage}
            />
        </Grid>
    );
};

export default HorarioForm;
