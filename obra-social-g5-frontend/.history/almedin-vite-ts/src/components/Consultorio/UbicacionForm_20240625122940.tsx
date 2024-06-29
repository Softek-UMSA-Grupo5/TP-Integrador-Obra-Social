import React from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Ubicacion } from '../../types/Ubicacion';

interface UbicacionFormProps {
    ubicacion: Ubicacion;
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbicacionForm: React.FC<UbicacionFormProps> = ({ ubicacion, handleLocationChange }) => {
    return (
        <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Calle
                    </InputLabel>
                    <OutlinedInput
                        name="calle"
                        value={ubicacion.calle}
                        onChange={handleLocationChange}
                        sx={{ my: 2, maxHeight: 40 }}
                        placeholder="Ingrese la calle del consultorio.."
                    />
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
                        onChange={handleLocationChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la altura del consultorio.."
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 1,
                        }}
                    />
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
                        onChange={handleLocationChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la ciudad del consultorio.."
                    />
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
                        onChange={handleLocationChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la provincia del consultorio.."
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default UbicacionForm;
