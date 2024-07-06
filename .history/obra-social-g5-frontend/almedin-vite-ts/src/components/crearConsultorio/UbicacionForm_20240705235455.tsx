import React, { useState } from 'react';
import { Grid, FormControl, OutlinedInput, FormHelperText, InputLabel } from '@mui/material';
import { Ubicacion } from '../../assets/models/Ubicacion';
import { validateField } from '../../utils/ConsultorioUtils';

interface UbicacionFormProps {
    ubicacion: Ubicacion;
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbicacionForm: React.FC<UbicacionFormProps> = ({ ubicacion, handleLocationChange }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError] = useState<string>('');
 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleLocationChange(event);
        validateField(name, value, setErrors);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Calle</InputLabel>
                    <OutlinedInput
                        name="calle"
                        value={ubicacion.calle}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Calle"
                        required
                        error={!!errors.calle}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.calle}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Altura o numeración</InputLabel>
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
                        placeholder="Altura o numeración"
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Ciudad</InputLabel>
                    <OutlinedInput
                        name="ciudad"
                        value={ubicacion.ciudad}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Ciudad"
                        required
                        error={!!errors.ciudad}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.ciudad}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Provincia</InputLabel>
                    <OutlinedInput
                        name="provincia"
                        value={ubicacion.provincia}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Provincia"
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
