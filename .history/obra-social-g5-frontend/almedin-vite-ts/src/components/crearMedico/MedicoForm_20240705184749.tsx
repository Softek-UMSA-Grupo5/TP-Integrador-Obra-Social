import React, {  useState } from 'react';
import { Grid} from '@mui/material';
import { MedicoRequestDto } from '../../assets/models/Medico';
import { maxLengthValidation, requiredValidation, validateField } from '../../utils/ConsultorioUtils';
import InputField from './InputField';

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
    const formFields = [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, error: !!errors.nombre, helperText: errors.nombre },
        { name: 'apellido', label: 'Apellido', type: 'text', required: true, error: !!errors.apellido, helperText: errors.apellido },
        { name: 'telefono', label: 'Teléfono', type: 'text', required: true, error: !!errors.telefono, helperText: errors.telefono, onBlur: handleTelefonoBlur },
        { name: 'email', label: 'Email', type: 'email', required: true, error: !!errors.email, helperText: errors.email },
        { name: 'dni', label: 'N° de Documento', type: 'text', required: true, error: !!errors.dni || !!tempError, helperText: errors.dni, inputProps: { inputMode: 'numeric', pattern: '[0-9]*', min: 1 } },
        { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true, error: !!errors.fechaNacimiento, helperText: errors.fechaNacimiento },
        { name: 'cuil', label: 'CUIL/T', type: 'text', required: true, error: !!errors.cuil, helperText: errors.cuil, onBlur: handleCuilBlur },
        { name: 'especialidad', label: 'Especialidad', type: 'text', required: true, error: !!errors.especialidad, helperText: errors.especialidad },
    ];

    return (
       <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="nombre" label="Nombre"
                    value={medicoData.nombre}
                    onChange={handleInputChange}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="apellido"
                    label="Apellido"
                    value={medicoData.apellido}
                    onChange={handleInputChange}
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="telefono"
                    label="Teléfono"
                    value={medicoData.telefono}
                    onChange={handleInputChange}
                    onBlur={handleTelefonoBlur}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="email"
                    label="Email"
                    value={medicoData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="dni"
                    label="N° de Documento"
                    type="text"
                    value={medicoData.dni !== undefined && medicoData.dni !== 0 ? medicoData.dni.toString() : ''}
                    onChange={handleInputChange}
                    error={!!errors.dni || !!tempError}
                    helperText={errors.dni}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 1,
                    }}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="fechaNacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    value={medicoData.fechaNacimiento}
                    onChange={handleInputChange}
                    error={!!errors.fechaNacimiento}
                    helperText={errors.fechaNacimiento}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="cuil"
                    label="CUIL/T"
                    value={medicoData.cuil}
                    onChange={handleInputChange}
                    onBlur={handleCuilBlur}
                    error={!!errors.cuil}
                    helperText={errors.cuil}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField
                    name="especialidad"
                    label=" "
                    value={medicoData.especialidad}
                    onChange={handleInputChange}
                    error={!!errors.especialidad}
                    helperText={errors.especialidad}
                    required
                />
            </Grid>
        </Grid>
    ); 
};

export default MedicoForm;
