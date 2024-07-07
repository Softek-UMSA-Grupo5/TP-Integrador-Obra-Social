import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Ubicacion } from '../../assets/models/Ubicacion';
import { validateField } from '../../utils/ConsultorioUtils';
import InputField from '../crearMedico/InputField';

interface UbicacionFormProps {
    ubicacion: Ubicacion;
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbicacionForm: React.FC<UbicacionFormProps> = ({ ubicacion, handleLocationChange }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleLocationChange(event);
        validateField(name, value, setErrors);
    };

    return (
        <Grid container spacing={1}>
            <InputField
                label="Calle"
                name="calle"
                value={ubicacion.calle}
                onChange={handleInputChange}
                error={!!errors.calle}
                helperText={errors.calle}
                required
            />
            <InputField
                label="Altura o numeración"
                name="altura"
                type="text"
                value={ubicacion.altura !== undefined && ubicacion.altura !== 0 ? ubicacion.altura.toString() : ''}
                onChange={handleInputChange}
                error={!!errors.altura}
                helperText={errors.altura}
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: -1,
                }}
                required
            />
            <InputField
                label="Ciudad"
                name="ciudad"
                value={ubicacion.ciudad}
                onChange={handleInputChange}
                error={!!errors.ciudad}
                helperText={errors.ciudad}
                required
            />
            <InputField
                label="Provincia"
                name="provincia"
                value={ubicacion.provincia}
                onChange={handleInputChange}
                error={!!errors.provincia}
                helperText={errors.provincia}
                required
            />
        </Grid>
    );
};

export default UbicacionForm;
