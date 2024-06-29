import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Ubicacion } from '../../models/Ubicacion';
import { requiredValidation } from '../../utils/ConsultorioUtils';

interface UbicacionFormProps {
    ubicacion: Ubicacion;
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbicacionForm: React.FC<UbicacionFormProps> = ({ ubicacion, handleLocationChange }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError, setTempError] = useState<string>('');

    const validateField = (fieldName: string, value: string | undefined) => {
        let error = '';

        switch (fieldName) {
            case 'calle':
            case 'ciudad':
            case 'provincia':
                error = requiredValidation(value) ?? '';
                break;
            case 'altura':
                error = requiredValidation(value) ?? '';
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

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleLocationChange(event);
        validateField(name, value);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormControl  variant="outlined" sx={{ my: 0.5, width: '70%' }}>
                   {/*  <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Calle
                    </InputLabel> */}
                    <OutlinedInput
                        name="calle"
                        value={ubicacion.calle}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Ingrese la calle del consultorio.."
                        required
                        error={!!errors.calle}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.calle}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5, width: '70%' }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Altura
                    </InputLabel>
                    <OutlinedInput
                        name="altura"
                        type="text"
                        value={
                            ubicacion.altura !== undefined && ubicacion.altura !== 0
                                ? ubicacion.altura.toString()
                                : ''
                        }
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Ingrese la altura del consultorio.."
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: -1,
                        }}
                        required
                        error={!!errors.altura || !!tempError}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.altura || tempError}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Ciudad
                    </InputLabel>
                    <OutlinedInput
                        name="ciudad"
                        value={ubicacion.ciudad}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Ingrese la ciudad del consultorio.."
                        required
                        error={!!errors.ciudad}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.ciudad}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Provincia
                    </InputLabel>
                    <OutlinedInput
                        name="provincia"
                        value={ubicacion.provincia}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Ingrese la provincia del consultorio.."
                        required
                        error={!!errors.provincia}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.provincia}
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default UbicacionForm;
