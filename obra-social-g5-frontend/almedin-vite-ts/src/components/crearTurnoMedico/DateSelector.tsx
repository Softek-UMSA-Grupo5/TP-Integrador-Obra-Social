import { Grid, Typography, RadioGroup, FormControlLabel, Radio, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Consultorio, TurnoMedico } from '../../types';
import { Dayjs } from 'dayjs';
import { generateTimeSlots } from '../../utils/generateTimeSlots';
import { formatearFecha } from '../../utils/formatearFecha';

interface Props {
    calendarValue: Dayjs | null;
    handleSelectedDate: (newValue: Dayjs | null) => void;
    selectedHorario: string;
    consultorios: Consultorio[];
    selectedConsultorio: string;
    selectedMedico: string;
    turnosMedicos: TurnoMedico[];
    handleSelectedHorario: (event: SelectChangeEvent<string>) => void;
}

const diaSemana = {
    1: 'LUNES',
    2: 'MARTES',
    3: 'MIERCOLES',
    4: 'JUEVES',
    5: 'VIERNES',
    6: 'SABADO',
    0: 'DOMINGO',
};

function DateSelector({
    calendarValue,
    handleSelectedDate,
    selectedHorario,
    selectedConsultorio,
    selectedMedico,
    consultorios,
    turnosMedicos,
    handleSelectedHorario,
}: Props) {

    const horarioAtencion = consultorios
        .find((c) => c.ubicacion.id === +selectedConsultorio && c.medicoId === +selectedMedico)
        ?.horarioAtencion?.find((h) => h.diaSemana === diaSemana[calendarValue?.day()]);
    const rows = generateTimeSlots(horarioAtencion?.horaInicio, horarioAtencion?.horaFin, 15);

    return (
        <>
            <Typography
                sx={{ fontSize: 16, color: 'black', mt: 5, fontWeight: 'bold' }}
                color="text.secondary"
                gutterBottom>
                Seleccionar un día y fecha para el turno
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            disablePast
                            value={calendarValue}
                            onChange={(newValue) => handleSelectedDate(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sx={{ height: 300, overflowY: 'scroll' }}>
                    {rows.length ? (
                        <RadioGroup
                            value={selectedHorario}
                            onChange={handleSelectedHorario}
                            name="radio-buttons-group">
                            {rows.map((row) => (
                                <FormControlLabel
                                    key={row.id}
                                    value={row.horario}
                                    control={<Radio />}
                                    label={row.horario}
                                    disabled={turnosMedicos.some(
                                        (c) =>
                                            formatearFecha(calendarValue?.toDate())  === c.fecha &&
                                            c.estaDisponible === false &&
                                            +row.horario.split(':')[0] === c.hora &&
                                            +row.horario.split(':')[1] === c.minutos
                                    )}
                                />
                            ))}
                        </RadioGroup>
                    ) : (
                        <Typography
                            sx={{ fontSize: 16, color: 'grey', mt: 5, fontWeight: 'bold' }}
                            color="text.secondary"
                            gutterBottom>
                            No hay horarios disponibles
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default DateSelector;
