import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { MedicoRequestDto } from '../../assets/models/Medico';
import {  validateField} from '../../utils/ConsultorioUtils';
import InputField from './InputField';
import { DatePicker } from '@mui/lab';

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

const MedicoForm: React.FC<MedicoFormularioNuevoProps> = ({medicoData, setMedicoData }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'dni') {
            if (!/^\d{0,8}$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dni: 'El DNI debe contener solo números y hasta 8 caracteres',
                }));
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        dni: '',
                    }));
                }, 2000);
                return;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dni: '',
                }));
            }
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
            [name]: value,
        }));

        validateField(name, value, setErrors);
    };
   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'cuil':
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
                break;
            case 'telefono':
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
                break;
            default:
                break;
        }
    };
    const formFields = [
        {name: 'nombre',label: 'Nombre',type: 'text',required: true,error: !!errors.nombre,helperText: errors.nombre,},
        {name: 'apellido',label: 'Apellido',type: 'text',required: true,error: !!errors.apellido,helperText: errors.apellido,},
        {name: 'telefono',label: 'Teléfono',type: 'text',required: true,error: !!errors.telefono,helperText: errors.telefono,onBlur: handleBlur,},
        {name: 'email',label: 'Email',type: 'email',required: true,error: !!errors.email,helperText: errors.email,},
        {name: 'dni',label: 'N° de Documento',type: 'text',required: true,error: !!errors.dni,helperText: errors.dni,initialValue: medicoData.dni,},
        {name: 'fechaNacimiento',label: 'Fecha de Nacimiento',type: 'date',required: true,error: !!errors.fechaNacimiento,helperText: errors.fechaNacimiento,},
        {name: 'cuil',label: 'CUIL/T',type: 'text',required: true,helperText: errors.cuil,onBlur: handleBlur,},
        {name: 'especialidad',label: 'Especialidad',type: 'text',required: true,error: !!errors.especialidad,helperText: errors.especialidad,},
    ];

    return (
        <Grid container spacing={1}>
           {formFields.map((field, index) => (
                <Grid key={index} item xs={12} sm={6}>
                    {field.name === 'fechaNacimiento' ? (
                        <DatePicker
                            label="Fecha de Nacimiento"
                            value={medicoData.fechaNacimiento ? new Date(medicoData.fechaNacimiento) : null}
                            onChange={(date) => handleDateChange(date)}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="yyyy-MM-dd"
                            minDate={new Date()} // Establece la fecha mínima como la fecha actual
                            error={!!errors.fechaNacimiento}
                            helperText={errors.fechaNacimiento}
                            required
                        />
                    ) : (
                        <InputField
                            name={field.name}
                            label={field.label}
                            type={field.type ?? 'text'}
                            value={medicoData[field.name as keyof MedicoRequestDto] as string}
                            onChange={handleInputChange}
                            error={field.error}
                            helperText={field.helperText}
                            required={field.required}
                        />
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default MedicoForm;