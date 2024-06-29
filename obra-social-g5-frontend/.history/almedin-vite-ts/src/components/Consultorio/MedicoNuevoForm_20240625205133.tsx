import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Medico } from '../../types/Medico';
import { maxLengthValidation, requiredValidation } from '../../utils/ConsultorioUtils';

interface MedicoFormularioNuevoProps {
    medicoData: Medico;
    handleMedicoDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicoNuevoForm: React.FC<MedicoFormularioNuevoProps> = ({
    medicoData,
    handleMedicoDataChange,
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError, setTempError] = useState<string>('');

    const validateField = (fieldName: string, value: string | number | undefined) => {
        let error = '';
        const telefonoValue = '';
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
            case 'telefono':
                error = requiredValidation(value as string | undefined) ?? '';
                if (!error && telefonoValue.length !== 10) {
                    error = 'Número de teléfono inválido. Debe tener exactamente 10 números.';
                }
                break;
            case 'email':
            case 'fechaNacimiento':
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

        if (name === 'dni' && /[a-zA-Z]/.test(value)) {
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
        } else {
            handleMedicoDataChange(event);
            validateField(name, value);
        }
    };
    const handleTelefonoBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length !== 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telefono: 'Número de teléfono inválido. Debe tener exactamente 10 números.',
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
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Nombre
                    </InputLabel>
                    <OutlinedInput
                        name="nombre"
                        value={medicoData.nombre}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el nombre del médico"
                        required
                        error={!!errors.nombre}
                    />
                    {errors.nombre && <FormHelperText error>{errors.nombre}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Apellido
                    </InputLabel>
                    <OutlinedInput
                        name="apellido"
                        value={medicoData.apellido}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el apellido del médico"
                        required
                        error={!!errors.apellido}
                    />
                    {errors.apellido && <FormHelperText error>{errors.apellido}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Teléfono
                    </InputLabel>
                    <OutlinedInput
                        name="telefono"
                        value={medicoData.telefono}
                        onChange={handleInputChange}
                        onBlur={handleTelefonoBlur}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el teléfono del médico sin 0 ni 15.."
                        required
                        error={!!errors.telefono}
                    />
                    {errors.telefono && <FormHelperText error>{errors.telefono}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Email
                    </InputLabel>
                    <OutlinedInput
                        name="email"
                        value={medicoData.email}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el email del médico"
                        required
                        error={!!errors.email}
                    />
                    {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                </FormControl>
            </Grid>
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
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el DNI del médico sin puntos.."
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 1,
                        }}
                        required
                        error={!!errors.dni || !!tempError}
                    />
                    {errors.dni && <FormHelperText error>{errors.dni}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Fecha de Nacimiento
                    </InputLabel>
                    <OutlinedInput
                        name="fechaNacimiento"
                        type="date"
                        value={medicoData.fechaNacimiento}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la fecha de nacimiento del médico"
                        required
                        error={!!errors.fechaNacimiento}
                    />
                    {errors.fechaNacimiento && (
                        <FormHelperText error>{errors.fechaNacimiento}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        CUIL
                    </InputLabel>
                    <OutlinedInput
                        name="cuil"
                        value={medicoData.cuil}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese el CUIL del médico sin guiones.."
                        required
                        error={!!errors.cuil}
                    />
                    {errors.cuil && <FormHelperText error>{errors.cuil}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Especialidad
                    </InputLabel>
                    <OutlinedInput
                        name="especialidad"
                        value={medicoData.especialidad}
                        onChange={handleInputChange}
                        sx={{ my: 1, maxHeight: 40 }}
                        placeholder="Ingrese la especialidad del médico"
                        required
                        error={!!errors.especialidad}
                    />
                    {errors.especialidad && (
                        <FormHelperText error>{errors.especialidad}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default MedicoNuevoForm;
