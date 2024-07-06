import React, {  useState } from 'react';
import { Grid, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { MedicoRequestDto } from '../../assets/models/Medico';
import { maxLengthValidation, requiredValidation } from '../../utils/ConsultorioUtils';
import { formatearFecha } from '../../utils/formatearFecha';

interface MedicoFormularioNuevoProps {
    medicoData: MedicoRequestDto;
    setMedicoData: React.Dispatch<React.SetStateAction<MedicoRequestDto>>;
    setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
    useMedicoEmail: boolean;
    setUseMedicoEmail: React.Dispatch<React.SetStateAction<boolean>>;
    usuarioEmail: string;
    setUsuarioEmail: React.Dispatch<React.SetStateAction<string>>;
    registerUser: boolean;
}

const MedicoForm: React.FC<MedicoFormularioNuevoProps> = ({ medicoData, setMedicoData }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tempError] = useState<string>('');

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
                break;
            default:
                break;
        }
        if (fieldName === 'fechaNacimiento') {
            const currentDate = new Date();
            const selectedDate = new Date(value as string);
            if (selectedDate > currentDate) {
                error = 'La fecha de nacimiento no puede ser mayor que la fecha actual';
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };

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
            (name === 'especialidad' && value.length > 50) ||
            (name === 'telefono' && value.length > 10) ||
            (name === 'cuil' && value.length > 15)
        ) {
            return;
        }

        setMedicoData((prevData) => ({
            ...prevData,
            [name]: name === 'dni' ? (isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)) : value,
        }));

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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Nombre</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Apellido</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Teléfono</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Email</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>N° de Documento</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel shrink sx={{ fontSize: '16px' }}>
                        Fecha de Nacimiento
                    </InputLabel>
                    <OutlinedInput
                        name="fechaNacimiento"
                        type="date"
                        value={formatearFecha(medicoData.fechaNacimiento)}
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>CUIL/T</InputLabel>
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
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                    <InputLabel sx={{ fontSize: '16px' }}>Especialidad</InputLabel>
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

export default MedicoForm;
