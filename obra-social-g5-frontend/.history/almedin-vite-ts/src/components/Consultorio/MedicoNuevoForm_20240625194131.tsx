import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Medico } from '../../types/Medico';
import { requiredValidation } from '../../utils/ConsultorioUtils';

interface MedicoFormularioNuevoProps {
    medicoData: Medico;
    handleMedicoDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicoNuevoForm: React.FC<MedicoFormularioNuevoProps> = ({
    medicoData,
    handleMedicoDataChange,
}) => {
    const [tempError, setTempError] = useState<string>(''); // State para mensaje temporal de error

    const validateField = (fieldName: string, value: string | number | undefined) => {
        let error = '';

        switch (fieldName) {
            case 'calle':
            case 'ciudad':
            case 'provincia':
                error = requiredValidation(value as string | undefined) ?? '';
                break;
            case 'dni':
                error = requiredValidation(value as string | undefined) ?? '';
                if (!error && isNaN(Number(value))) {
                    setTempError('Ingrese solo números');
                    setTimeout(() => {
                        setTempError('');
                    }, 2000);
                }
                break;
            default:
                break;
        }

        // Actualizar errores en el estado
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };

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
            {/* Otros campos de formulario */}
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
                        onChange={(e) => {
                            handleMedicoDataChange(e);
                            validateField('dni', e.target.value);
                        }}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el DNI del médico sin puntos"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 1,
                        }}
                    />
                    {tempError && (
                        <FormHelperText sx={{ color: 'red', position: 'absolute', bottom: '-20px' }}>
                            {tempError}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            {/* Otros campos de formulario */}
        </Grid>
    );
};

export default MedicoNuevoForm;
