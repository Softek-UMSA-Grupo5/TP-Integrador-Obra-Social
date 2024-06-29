import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Ubicacion } from '../../types/Ubicacion';
import { requiredValidation } from '../../utils/ConsultorioUtils'; 

interface UbicacionFormProps {
    ubicacion: Ubicacion;
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbicacionForm: React.FC<UbicacionFormProps> = ({ ubicacion, handleLocationChange }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (fieldName: string, value: string | undefined) => {
    let error = '';

    switch (fieldName) {
        case 'calle':
        case 'ciudad':
        case 'provincia':
        case 'altura':
            error = requiredValidation(value) ?? ''; 
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
        <Grid container spacing={2} sx={{ margin: 'auto', alignItems: 'center' }}>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Calle
                    </InputLabel>
                    <OutlinedInput
                        name="calle"
                        value={ubicacion.calle}
                        onChange={handleInputChange}
                        sx={{ my: 2, maxHeight: 40 }}
                        placeholder="Ingrese la calle del consultorio.."
                        required
                        error={!!errors.calle} 
                    />
                    {errors.calle && <FormHelperText error>{errors.calle}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
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
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la altura del consultorio.."
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 1,
                        }}
                        required
                        error={!!errors.altura}
                    />
                    {errors.altura && <FormHelperText error>{errors.altura}</FormHelperText>}
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
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la ciudad del consultorio.."
                        required
                        error={!!errors.ciudad}
                    />
                    {errors.ciudad && <FormHelperText error>{errors.ciudad}</FormHelperText>}
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
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la provincia del consultorio.."
                        required
                        error={!!errors.provincia}
                    />
                    {errors.provincia && <FormHelperText error>{errors.provincia}</FormHelperText>}
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default UbicacionForm;
