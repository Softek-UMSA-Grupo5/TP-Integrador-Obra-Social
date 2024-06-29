import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Medico } from '../../models/Medico';
import { maxLengthValidation, requiredValidation } from '../../utils/ConsultorioUtils';

interface MedicoFormularioNuevoProps {
    medicoData: Medico;
    setMedicoData: React.Dispatch<React.SetStateAction<Medico>>;
}

const MedicoNuevoForm: React.FC<MedicoFormularioNuevoProps> = ({
    medicoData,
    setMedicoData,
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError, setTempError] = useState<string>('');

    const validateField = (fieldName: string, value: string | number | undefined) => {
        let error = '';

        switch (fieldName) {
            case 'nombre':
            case 'apellido':
                error = requiredValidation(value as string | undefined) ?? '';
                if (!error) {
                    error = maxLengthValidation(value as string, 20) ?? '';
                }
                break;
            case 'especialidad':
                error = requiredValidation(value as string | undefined) ?? '';
                if (!error) {
                    error = maxLengthValidation(value as string, 50) ?? '';
                }
                break;
            case 'email':
            case 'fechaNacimiento':
            case 'telefono':
            case 'cuil':
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

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Validación para DNI que solo debe contener números
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
            return; // Detener la ejecución si el DNI contiene caracteres no numéricos
        }

        // Validación de longitud máxima para nombre, apellido, especialidad, teléfono y CUIL
        if (
            (name === 'nombre' || name === 'apellido' || name === 'especialidad') &&
            value.length > 20
        ) {
            return;
        }
        if (name === 'telefono' && value.length > 10) {
            return;
        }
        if (name === 'cuil' && value.length > 15) {
            return;
        }

        // Actualización del estado de medicoData
        setMedicoData((prevData) => ({
            ...prevData,
            [name]: name === 'dni' ? (isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)) : value,
        }));

        // Validación de campo específica
        validateField(name, value);
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
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Nombre
                    </InputLabel>
                    <OutlinedInput
                        name="nombre"
                        value={medicoData.nombre}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Nombre"
                        required
                        error={!!errors.nombre}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.nombre}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Apellido
                    </InputLabel>
                    <OutlinedInput
                        name="apellido"
                        value={medicoData.apellido}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Apellido"
                        required
                        error={!!errors.apellido}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.apellido}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Teléfono
                    </InputLabel>
                    <OutlinedInput
                        name="telefono"
                        value={medicoData.telefono}
                        onChange={handleInputChange}
                        onBlur={handleTelefonoBlur}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Teléfono"
                        required
                        error={!!errors.telefono}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.telefono}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Email
                    </InputLabel>
                    <OutlinedInput
                        name="email"
                        value={medicoData.email}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Email"
                        required
                        error={!!errors.email}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.email}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        N° de Documento
                    </InputLabel>
                    <OutlinedInput
                        name="dni"
                        type="text"
                        value={
                            medicoData.dni !== undefined && medicoData.dni !== 0
                                ? medicoData.dni.toString()
                                : ''
                        }
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="N° de Documento"
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
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Fecha de Nacimiento
                    </InputLabel>
                    <OutlinedInput
                        name="fechaNacimiento"
                        type="date"
                        value={medicoData.fechaNacimiento}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Fecha de nacimiento"
                        required
                        error={!!errors.fechaNacimiento}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.fechaNacimiento}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        CUIL/T
                    </InputLabel>
                    <OutlinedInput
                        name="cuil"
                        value={medicoData.cuil}
                        onChange={handleInputChange}
                        onBlur={handleCuilBlur}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="CUIL/T"
                        required
                        error={!!errors.cuil}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.cuil}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Especialidad
                    </InputLabel>
                    <OutlinedInput
                        name="especialidad"
                        value={medicoData.especialidad}
                        onChange={handleInputChange}
                        sx={{ my: 1.5, maxHeight: 40 }}
                        placeholder="Especialidad"
                        required
                        error={!!errors.especialidad}
                    />
                    <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                        {errors.especialidad}
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default MedicoNuevoForm;
