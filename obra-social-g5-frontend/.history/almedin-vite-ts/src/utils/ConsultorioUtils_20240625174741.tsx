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

// validaciones.ts
export const requiredValidation = (value: string | undefined): string | undefined => {
    if (!value || value.trim() === '') {
        return 'Este campo es requerido';
    }
    return undefined;
};
