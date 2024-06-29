import { MenuItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ConsultorioCreateRequest } from '../types/Consultorio';

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

export const handleTimeChange = (
    type: 'inicio' | 'fin',
    value: string,
    officeData: ConsultorioCreateRequest, // Asegúrate de definir el tipo correcto de officeData
    setOfficeData: Dispatch<SetStateAction<ConsultorioCreateRequest>> // Usa Dispatch y SetStateAction si usas useState
) => {
    const updatedHorarioAtencion = officeData.horarioAtencion.map((horario) => ({
        ...horario,
        [type === 'inicio' ? 'horaInicio' : 'horaFin']: `${value}:00`,
    }));
    setOfficeData((prevData) => ({
        ...prevData,
        horarioAtencion: updatedHorarioAtencion,
    }));
};

export const handleSelectChange = (
    index: number,
    value: string,
    officeData: ConsultorioCreateRequest,
    setOfficeData: Dispatch<SetStateAction<ConsultorioCreateRequest>>
) => {
    const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
        i === index ? { ...horario, diaSemana: value } : horario
    );
    setOfficeData((prevData) => ({
        ...prevData,
        horarioAtencion: updatedHorarioAtencion,
    }));
};

export const handleRemoveHorario = (
    index: number,
    officeData: ConsultorioCreateRequest,
    setOfficeData: Dispatch<SetStateAction<ConsultorioCreateRequest>>
) => {
    const updatedHorarioAtencion = officeData.horarioAtencion.filter((_, i) => i !== index);
    setOfficeData((prevData) => ({
        ...prevData,
        horarioAtencion: updatedHorarioAtencion,
    }));
};

export const handleAddHorario = (
    setOfficeData: Dispatch<SetStateAction<ConsultorioCreateRequest>>
) => {
    setOfficeData((prevData) => ({
        ...prevData,
        horarioAtencion: [
            ...prevData.horarioAtencion,
            { diaSemana: '', horaInicio: '', horaFin: '' },
        ],
    }));
};

