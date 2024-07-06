import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import HorarioItem from './HorarioItem';
import { Horario } from '../../assets/models/Horario';

interface HorarioListProps {
    horarioAtencion: Horario[];
    handleSelectChange: (index: number, value: string) => void;
    handleTimeChange: (index: number, type: 'inicio' | 'fin', value: string) => void;
    handleRemoveHorario: (index: number) => void;
    handleAddHorario: () => void;
    errorMessage?: string;
}

const HorarioList: React.FC<HorarioListProps> = ({
    horarioAtencion,
    handleSelectChange,
    handleTimeChange,
    handleRemoveHorario,
    handleAddHorario,
    errorMessage,
}) => {
    return (
        <>
            <Grid container xs={12} display={'flex'} justifyContent={'center'}>
                <Grid container spacing={2}>
                    {horarioAtencion.map((horario, index) => (
                        <HorarioItem
                            key={index}
                            index={index}
                            horario={horario}
                            handleSelectChange={handleSelectChange}
                            handleTimeChange={handleTimeChange}
                            handleRemoveHorario={handleRemoveHorario}
                        />
                    ))}
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Button variant="outlined" color="primary" onClick={handleAddHorario}>
                        Agregar Horario
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {errorMessage && (
                        <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default HorarioList;
