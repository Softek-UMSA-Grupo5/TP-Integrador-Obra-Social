import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { RecepcionistaRequestDto } from '../../assets/models/Recepcionista';
import { useState } from 'react';
import { getFormattedDate, validateField } from '../../utils/ConsultorioUtils';
import InputField from '../crearMedico/InputField';

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
    }
     const formFields = [
        {name: 'nombre',label: 'Nombre',type: 'text',required: true,error: !!errors.nombre,helperText: errors.nombre,},
        {name: 'apellido',label: 'Apellido',type: 'text',required: true,error: !!errors.apellido,helperText: errors.apellido,},
        {name: 'telefono',label: 'Teléfono',type: 'text',required: true,error: !!errors.telefono,helperText: errors.telefono,onBlur: handleBlur,},
        {name: 'email',label: 'Email',type: 'email',required: true,error: !!errors.email,helperText: errors.email,},
        {name: 'dni',label: 'N° de Documento',type: 'text',required: true,error: !!errors.dni,helperText: errors.dni,initialValue: recepcionistaData.dni,},
        {name: 'fechaNacimiento',label: 'Fecha de Nacimiento',type: 'date',required: true,error: !!errors.fechaNacimiento,helperText: errors.fechaNacimiento,},
        {name: 'cuil',label: 'CUIL/T',type: 'text',required: true,helperText: errors.cuil,onBlur: handleBlur,},
    ];
     const currentDate = getFormattedDate(new Date());

     return (
        <Grid container spacing={1}>
            {formFields.map((field, index) => (
                <Grid key={index} item xs={12} sm={6}>
                    <InputField
                        name={field.name}
                        label={field.label}
                        type={field.type ?? 'text'}
                        value={recepcionistaData[field.name as keyof RecepcionistaRequestDto] as string}
                        onChange={handleInputChange}
                        onBlur={field.onBlur ? handleBlur : undefined}
                        error={field.error}
                        helperText={field.helperText}
                        required={field.required}
                        inputProps={{max: currentDate}}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default RecepcionistaForm;
