import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { RecepcionistaRequestDto } from '../../assets/models/Recepcionista';
import { useState } from 'react';
import { validateField } from '../../utils/ConsultorioUtils';

interface RecepcionistaFormProps {
    recepcionistaData: RecepcionistaRequestDto;
    setRecepcionistaData: React.Dispatch<React.SetStateAction<RecepcionistaRequestDto>>;
}

const RecepcionistaForm: React.FC<RecepcionistaFormProps> = ({
    recepcionistaData,
    setRecepcionistaData,
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError] = useState<string>(''); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'dni' && /[^\d]/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dni: 'El DNI debe contener solo números',
            }));
            setTimeout(() => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dni: '',
                }));
            }, 2000);
            return;
        }

        if (
            ((name === 'nombre' || name === 'apellido') && value.length > 20) ||
            (name === 'telefono' && value.length > 10) ||
            (name === 'cuil' && value.length > 15)
        ) {
            return;
        }

        setRecepcionistaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        validateField(name, value, setErrors);
    };
    const handleCuilBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value.trim().length < 8 || value.trim().length > 15) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cuil: 'CUIL inválido.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                cuil: '',
            }));
        }
    };

    const handleTelefonoBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value.trim().length !== 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telefono: 'Número de teléfono inválido.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telefono: '',
            }));
        }
    };

    return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth  variant='outlined' sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }}>Nombre</InputLabel>
                        <OutlinedInput
                            name="nombre"
                            value={recepcionistaData.nombre}
                            onChange={handleInputChange}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder='Nombre'
                            required
                            error={!!errors.nombre}
                            
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.nombre}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant='outlined' sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }} >Apellido</InputLabel>
                        <OutlinedInput
                            name="apellido"
                            value={recepcionistaData.apellido}
                            onChange={handleInputChange}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder='Apellido'
                            required
                            error={!!errors.apellido}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.apellido}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant='outlined' sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }}>Teléfono</InputLabel>
                        <OutlinedInput
                            name="telefono"
                            value={recepcionistaData.telefono}
                            onChange={handleInputChange}
                            onBlur={handleTelefonoBlur}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder='Teléfono'
                            required
                            error={!!errors.telefono}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.telefono}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant='outlined' sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }}>Email</InputLabel>
                        <OutlinedInput
                            name="email"
                            value={recepcionistaData.email}
                            onChange={handleInputChange}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder='Email'
                            required
                            error={!!errors.email}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.email}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }}>N° de Documento</InputLabel>
                        <OutlinedInput
                            name="dni"
                            type="text"
                            value={recepcionistaData.dni !== undefined && recepcionistaData.dni !== 0 ? recepcionistaData.dni.toString() : ''}
                            onChange={handleInputChange}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder='N° de Documento'
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 1,
                            }}
                            required
                            error={!!errors.dni || !!tempError}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.dni}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                        <InputLabel shrink sx={{ fontSize: '16px' }}>Fecha de Nacimiento</InputLabel>
                        <OutlinedInput
                            name="fechaNacimiento"
                            type="date"
                            value={recepcionistaData.fechaNacimiento}
                            onChange={handleInputChange}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder="Fecha de Nacimiento"
                            required
                            error={!!errors.fechaNacimiento}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.fechaNacimiento}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                        <InputLabel sx={{ fontSize: '16px' }}>CUIL/T</InputLabel>
                        <OutlinedInput
                            name="cuil"
                            value={recepcionistaData.cuil}
                            onChange={handleInputChange}
                            onBlur={handleCuilBlur}
                            sx={{my: 1.5, maxHeight: 40}}
                            placeholder="CUIL/T"
                            required
                            error={!!errors.cuil}
                        />
                        <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                            {errors.cuil}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
    );
};

export default RecepcionistaForm;
