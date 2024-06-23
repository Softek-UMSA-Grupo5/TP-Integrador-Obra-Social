import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Grid,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css';

function generateTimeSlots(
    start: string,
    end: string,
    interval: number
): { id: number; horario: string }[] {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const slots: { id: number; horario: string }[] = [];
    let id = 0;

    while (startTime <= endTime) {
        slots.push({ id: id++, horario: startTime.toTimeString().slice(0, 5) });
        startTime.setMinutes(startTime.getMinutes() + interval);
    }

    return slots;
}

const socio = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '1234567891',
    email: 'juan.perez@example.com',
    dni: 12345678,
    cuil: '20123456789',
    fechaNacimiento: '1985-05-14',
    nroAfiliado: '022-12345678-1',
    estaEliminado: false,
    beneficiarios: [
        {
            id: 1,
            nombre: 'Ana',
            apellido: 'Pérez',
            telefono: '9876543211',
            email: 'ana.perez@example.com',
            dni: 23456789,
            fechaNacimiento: '2010-06-19',
            cuil: '20234567893',
            estaEliminado: false,
            socio: 1,
        },
    ],
};

const medicos = [
    {
        id: 2,
        nombre: 'Luciano',
        apellido: 'Malleret',
        telefono: '3456545581',
        email: 'lucianomalleret8@gmail.com',
        dni: 41907546,
        cuil: '23419075469',
        fechaNacimiento: '1999-05-16',
        estaEliminado: false,
        especialidad: 'Odontólogo',
    },
    {
        id: 3,
        nombre: 'Pablo',
        apellido: 'Moya',
        telefono: '3454050829',
        email: 'pablomoya@gmail.com',
        dni: 40562846,
        cuil: '23405628469',
        fechaNacimiento: '1998-02-04',
        estaEliminado: false,
        especialidad: 'Oculista',
    },
    {
        id: 4,
        nombre: 'Ignacio',
        apellido: 'Lower',
        telefono: '3454123589',
        email: 'ignacioL@gmail.com',
        dni: 41381776,
        cuil: '23413817769',
        fechaNacimiento: '1998-04-24',
        estaEliminado: false,
        especialidad: 'Oftalmologo',
    },
];

const consultorios = [
    {
        id: 4,
        horarioAtencion: [
            {
                id: 31,
                diaSemana: 'LUNES',
                horaInicio: '08:30:00',
                horaFin: '12:30:00',
                estaEliminado: false,
                codigo: 'bbf39',
            },
            {
                id: 32,
                diaSemana: 'MARTES',
                horaInicio: '10:00:00',
                horaFin: '15:00:00',
                estaEliminado: false,
                codigo: '959d1',
            },
            {
                id: 33,
                diaSemana: 'MIERCOLES',
                horaInicio: '11:00:00',
                horaFin: '18:00:00',
                estaEliminado: false,
                codigo: '79d32',
            },
        ],
        ubicacion: {
            id: 4,
            ciudad: 'Gualeguaychú',
            provincia: 'Entre Ríos',
            calle: 'Urquiza',
            altura: 750,
            estaEliminado: false,
            codigo: '1d14a5a9-a',
        },
        estaEliminado: false,
        codigo: '691ee',
        medicoId: 3,
    },
    {
        id: 5,
        horarioAtencion: [
            {
                id: 34,
                diaSemana: 'LUNES',
                horaInicio: '08:00:00',
                horaFin: '13:00:00',
                estaEliminado: false,
                codigo: '9e251',
            },
            {
                id: 35,
                diaSemana: 'MIERCOLES',
                horaInicio: '09:00:00',
                horaFin: '14:00:00',
                estaEliminado: false,
                codigo: '42026',
            },
            {
                id: 36,
                diaSemana: 'VIERNES',
                horaInicio: '10:00:00',
                horaFin: '16:00:00',
                estaEliminado: false,
                codigo: '78a82',
            },
        ],
        ubicacion: {
            id: 5,
            ciudad: 'Concordia',
            provincia: 'Entre Ríos',
            calle: 'San Lorenzo',
            altura: 1234,
            estaEliminado: false,
            codigo: '8be96c62-c',
        },
        estaEliminado: false,
        codigo: '6ab83',
        medicoId: 3,
    },
    {
        id: 6,
        horarioAtencion: [
            {
                id: 37,
                diaSemana: 'MARTES',
                horaInicio: '08:30:00',
                horaFin: '12:30:00',
                estaEliminado: false,
                codigo: 'ad452',
            },
            {
                id: 38,
                diaSemana: 'JUEVES',
                horaInicio: '14:00:00',
                horaFin: '19:00:00',
                estaEliminado: false,
                codigo: '02762',
            },
            {
                id: 39,
                diaSemana: 'SABADO',
                horaInicio: '09:00:00',
                horaFin: '13:00:00',
                estaEliminado: false,
                codigo: '62cee',
            },
        ],
        ubicacion: {
            id: 6,
            ciudad: 'Paraná',
            provincia: 'Entre Ríos',
            calle: 'Mitre',
            altura: 567,
            estaEliminado: false,
            codigo: 'e3143e97-e',
        },
        estaEliminado: false,
        codigo: '09fa7',
        medicoId: 3,
    },
    {
        id: 7,
        horarioAtencion: [
            {
                id: 40,
                diaSemana: 'LUNES',
                horaInicio: '07:00:00',
                horaFin: '11:00:00',
                estaEliminado: false,
                codigo: '420a3',
            },
            {
                id: 41,
                diaSemana: 'MIERCOLES',
                horaInicio: '13:00:00',
                horaFin: '17:00:00',
                estaEliminado: false,
                codigo: 'c1a5e',
            },
            {
                id: 42,
                diaSemana: 'VIERNES',
                horaInicio: '12:00:00',
                horaFin: '18:00:00',
                estaEliminado: false,
                codigo: '63eb7',
            },
        ],
        ubicacion: {
            id: 7,
            ciudad: 'Villaguay',
            provincia: 'Entre Ríos',
            calle: 'Sarmiento',
            altura: 890,
            estaEliminado: false,
            codigo: '933309af-5',
        },
        estaEliminado: false,
        codigo: '7f62e',
        medicoId: 4,
    },
    {
        id: 8,
        horarioAtencion: [
            {
                id: 43,
                diaSemana: 'LUNES',
                horaInicio: '09:30:00',
                horaFin: '13:30:00',
                estaEliminado: false,
                codigo: 'af580',
            },
            {
                id: 44,
                diaSemana: 'JUEVES',
                horaInicio: '10:00:00',
                horaFin: '15:00:00',
                estaEliminado: false,
                codigo: 'cd67b',
            },
            {
                id: 45,
                diaSemana: 'VIERNES',
                horaInicio: '11:00:00',
                horaFin: '17:00:00',
                estaEliminado: false,
                codigo: 'c91f9',
            },
        ],
        ubicacion: {
            id: 8,
            ciudad: 'Federación',
            provincia: 'Entre Ríos',
            calle: 'Belgrano',
            altura: 234,
            estaEliminado: false,
            codigo: 'a491d654-1',
        },
        estaEliminado: false,
        codigo: 'de907',
        medicoId: 4,
    },
    {
        id: 9,
        horarioAtencion: [
            {
                id: 28,
                diaSemana: 'MARTES',
                horaInicio: '08:00:00',
                horaFin: '12:00:00',
                estaEliminado: false,
                codigo: 'aff81',
            },
            {
                id: 29,
                diaSemana: 'MIERCOLES',
                horaInicio: '14:00:00',
                horaFin: '18:00:00',
                estaEliminado: false,
                codigo: '1f87a',
            },
            {
                id: 30,
                diaSemana: 'SABADO',
                horaInicio: '10:00:00',
                horaFin: '14:00:00',
                estaEliminado: false,
                codigo: '43f40',
            },
        ],
        ubicacion: {
            id: 9,
            ciudad: 'Victoria',
            provincia: 'Entre Ríos',
            calle: 'Independencia',
            altura: 456,
            estaEliminado: false,
            codigo: 'bd34cb3e-2',
        },
        estaEliminado: false,
        codigo: '4bb01',
        medicoId: 2,
    },
    {
        id: 12,
        horarioAtencion: [],
        ubicacion: {
            id: 4,
            ciudad: 'Gualeguaychú',
            provincia: 'Entre Ríos',
            calle: 'Urquiza',
            altura: 750,
            estaEliminado: false,
            codigo: '1d14a5a9-a',
        },
        estaEliminado: false,
        codigo: '20e7d',
        medicoId: 2,
    },
];

function AppointmentCard() {
    const [beneficiario, setBeneficiario] = React.useState('');
    const [solicitante, setSolicitante] = React.useState('Para mí');
    const [especialista, setEspecialista] = React.useState('');
    const [consultorio, setConsultorio] = React.useState('');
    const [medico, setMedico] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const rows = generateTimeSlots('09:00', '14:00', 15);

    const handleBeneficiario = (event: SelectChangeEvent) =>
        setBeneficiario(event.target.value as string);
    const handleMedico = (event: SelectChangeEvent) => setMedico(event.target.value as string);
    const handleEspecialista = (event: SelectChangeEvent) =>
        {
          setEspecialista(event.target.value as string);
          setConsultorio('');
        }
    const handleConsultorio = (event: SelectChangeEvent) =>{
      setConsultorio(event.target.value as string);
      setMedico('');
    }
        
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSolicitante((event.target as HTMLInputElement).value);

    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" component="div">
                    Solicitar turno médico
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Completa el formulario para solicitar un turno médico.
                </Typography>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel id="solicitante-turno" className="label">
                        Para quién es el turno médico?
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="solicitante-turno"
                        value={solicitante}
                        onChange={handleRadioChange}
                        name="radio-buttons-group">
                        <FormControlLabel value="Para mí" control={<Radio />} label="Para mí" />
                        <FormControlLabel
                            value="Para un beneficiario"
                            control={<Radio />}
                            label="Para un beneficiario"
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel id="beneficiarios-turno" className={solicitante === 'Para un beneficiario' ? "label" : "label-disabled"}>
                        Beneficiarios
                    </FormLabel>
                    <Select
                        labelId="beneficiarios-turno"
                        id="beneficiarios"
                        value={beneficiario}
                        onChange={handleBeneficiario}
                        disabled={solicitante !== 'Para un beneficiario'}
                        fullWidth>
                        {socio.beneficiarios.map((beneficiario) => (
                            <MenuItem key={beneficiario.dni} value={beneficiario.dni}>
                                {beneficiario.apellido.concat(' '
                                  ,beneficiario.nombre
                                  ,', '
                                  ,beneficiario.dni)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel id="especialidad-turno" className="label">
                        Especialidad
                    </FormLabel>
                    <Select
                        labelId="especialidad-turno"
                        id="especialidad"
                        value={especialista}
                        onChange={handleEspecialista}
                        fullWidth>
                        {medicos.map((medico) => (
                            <MenuItem key={medico.id} value={medico.id}>
                                {medico.especialidad}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel id="consultorio-turno" className={especialista !== '' ? "label" : "label-disabled"}>
                        Consultorio
                    </FormLabel>
                    <Select
                        labelId="consultorio-turno"
                        id="consultorio"
                        value={consultorio}
                        onChange={handleConsultorio}
                        fullWidth
                        disabled={especialista === ''}>
                        {consultorios.filter((consultorio) => consultorio.medicoId === +especialista)
                        .map((consultorio) => (
                            <MenuItem key={consultorio.id} value={consultorio.id}>
                                {Object.values(consultorio.ubicacion).join(', ')}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel id="medico-turno" className={consultorio !== '' ? "label" : "label-disabled"}>
                        Medico
                    </FormLabel>
                    <Select
                        labelId="medico-turno"
                        id="medico"
                        value={medico}
                        onChange={handleMedico}
                        fullWidth
                        disabled={consultorio === ''}>
                        {medicos.filter((medico) => medico.id === consultorios.find((e) => e.id === +consultorio)?.medicoId)
                        .map((medico) => (
                            <MenuItem key={medico.id} value={medico.nombre}>
                                {medico.nombre + ' ' + medico.apellido}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TableContainer component={Paper} sx={{ height: 290 }}>
                            <Table aria-label="simple table" sx={{ height: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Horarios</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}>
                                            <TableCell component="th" scope="row">
                                                {row.horario}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                <FormControl sx={{ width: '100%' }}>
                    <FormLabel id="motivo-consulta-turno" className="label">
                        Motivo de la consulta?
                    </FormLabel>
                    <TextField
                        id="motivo-consulta"
                        aria-labelledby="motivo-consulta-turno"
                        multiline
                        rows={6}
                        fullWidth
                    />
                </FormControl>

                <Button variant="contained" sx={{ mt: 3, width: '100%' }}>
                    Agendar Turno Médico
                </Button>
            </CardContent>
        </React.Fragment>
    );
}

function App() {
    return (
        <Box sx={{ maxWidth: 700, margin: 'auto' }}>
            <Card variant="outlined">
                <AppointmentCard />
            </Card>
        </Box>
    );
}

export default App;
