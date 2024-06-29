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

export const validateString = (value: string, minLength: number, maxLength: number): boolean => {
    return value.length >= minLength && value.length <= maxLength;
};

export const validateInteger = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validateDate = (date: string): boolean => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
};

export const validateHorarios = (horarios: any[]): boolean => {
    if (horarios.length <= 1) {
        return true;
    }

    for (let i = 0; i < horarios.length - 1; i++) {
        for (let j = i + 1; j < horarios.length; j++) {
            if (horarios[i].diaSemana === horarios[j].diaSemana) {
                if (horariosSeSuperponen(horarios[i], horarios[j])) {
                    return false;
                }
            }
        }
    }
    return true;
};

const horariosSeSuperponen = (horario1: any, horario2: any): boolean => {
    const inicio1 = new Date(`1970-01-01T${horario1.horaInicio}Z`);
    const fin1 = new Date(`1970-01-01T${horario1.horaFin}Z`);
    const inicio2 = new Date(`1970-01-01T${horario2.horaInicio}Z`);
    const fin2 = new Date(`1970-01-01T${horario2.horaFin}Z`);

    return (inicio1 < fin2 && inicio2 < fin1)
        || (inicio1.getTime() === inicio2.getTime() && fin1.getTime() === fin2.getTime())
        || (inicio1 > inicio2 && fin1 < fin2);
};
