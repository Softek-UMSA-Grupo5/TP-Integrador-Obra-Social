import { MenuItem } from '@mui/material';

export const generateTimeOptions = () => {
    const options: JSX.Element[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const hourStr = String(hour).padStart(2, '0');
            const minuteStr = String(minute).padStart(2, '0');
            options.push(
                <MenuItem key={`${hourStr}:${minuteStr}`} value={`${hourStr}:${minuteStr}`}>
                    {`${hourStr}:${minuteStr}`}
                </MenuItem>
            );
        }
    }
    return options;
};

export const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

//VALIDACIONES

export const requiredValidation = (value: string | undefined): string | undefined => {
    if (!value || value.trim() === '') {
        return 'Este campo es requerido';
    }
    return undefined;
};
export const maxLengthValidation = (value: string, maxLength: number): string | undefined => {
    if (value.length > maxLength) {
        return `No puedes exceder los ${maxLength} caracteres`;
    }
    return undefined;
};
export const validateField = (
    fieldName: string,
    value: string | number | undefined,
    errors: Record<string, string>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): void => {
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