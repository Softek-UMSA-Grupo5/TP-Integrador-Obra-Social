import React, { ChangeEvent } from 'react';
import { CardContent, Typography, Button, SelectChangeEvent } from '@mui/material';
import SolicitanteRadioGroup from './SolicitanteRadioGroup';
import BeneficiariosSelect from './BeneficiarioSelect';
import EspecialidadSelect from './EspecialidadSelect';
import ConsultorioSelect from './ConsultorioSelect';
import MedicoSelect from './MedicoSelect';
import DateSelector from './DateSelector';
import MotivoConsulta from './motivoConsulta';
import dayjs, { Dayjs } from 'dayjs';
import { formatearFecha } from '../../assets/utils/formatearFecha.js';
import { getMedicos } from '../../assets/axios/medicos.js';
import { getConsultorios } from '../../assets/axios/consultorios.js';
import { getSocioById } from '../../assets/axios/socios.js';
import { getUbicaciones } from '../../assets/axios/ubicaciones.js';
import { getTurnosMedicos, postTurnoMedico } from '../../assets/axios/turnosMedicos.js';
import { Medico, Socio, Consultorio, Ubicacion, TurnoMedico } from '../../types.js';

const token = localStorage.getItem('token');

function AppointmentCard() {
    const [medicos, setMedicos] = React.useState<Medico[]>([]);
    const [consultorios, setConsultorios] = React.useState<Consultorio[]>([]);
    const [socio, setSocio] = React.useState<Socio>();
    const [turnosMedicos, setTurnosMedicos] = React.useState<TurnoMedico[]>([]);
    const [ubicaciones, setUbicaciones] = React.useState<Ubicacion[]>([]);

    const [solicitante, setSolicitante] = React.useState<string>('Para mí');
    const [selectedBeneficiario, setSelectedBeneficiario] = React.useState<string>('');
    const [selectedEspecialidad, setSelectedEspecialidad] = React.useState<string>('');
    const [selectedConsultorio, setSelectedConsultorio] = React.useState<string>('');
    const [selectedMedico, setSelectedMedico] = React.useState<string>('');
    const [selectedHorario, setSelectedHorario] = React.useState<string>('');
    const [selectedDate, setSelectedDate] = React.useState<String | null>(
        formatearFecha(new Date())
    );
    const [motivo, setMotivo] = React.useState<string>('');
    const [calendarValue, setCalendarValue] = React.useState<Dayjs | null>(dayjs(Date.now()));

    const json: TurnoMedico = {
        fecha: selectedDate,
        hora: +selectedHorario.split(':')[0],
        minutos: +selectedHorario.split(':')[1],
        motivoConsulta: motivo,
        medicoId: +selectedMedico,
        socioId: 1,
    };

    console.log(json);

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            getMedicos(token).then(response => setMedicos(response));
            getConsultorios(token).then(response => setConsultorios(response));
            getSocioById(1, token).then(response => setSocio(response));
            getUbicaciones(token).then(response => setUbicaciones(response));
            getTurnosMedicos(token).then(response => setTurnosMedicos(response));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); 

    const handleSelectedBeneficiario = (event: SelectChangeEvent<string>) =>
        setSelectedBeneficiario(event.target.value);
    const handleSelectedMedico = (event: SelectChangeEvent<string>) =>
        setSelectedMedico(event.target.value);
    const handleSelectedEspecialidad = (event: SelectChangeEvent<string>) => {
        setSelectedEspecialidad(event.target.value);
        setSelectedConsultorio('');
    };
    const handleSelectedConsultorio = (event: SelectChangeEvent<string>) => {
        setSelectedConsultorio(event.target.value);
        setSelectedMedico('');
    };
    const handleRadioChange = (event: SelectChangeEvent<{ value: string }>) =>
        setSolicitante((event.target as HTMLInputElement).value);
    const handleSelectedHorario = (event: SelectChangeEvent<string>) =>
        setSelectedHorario(event.target.value as string);
    const handleMotivo = (event: ChangeEvent<{ value: string }>) => setMotivo(event.target.value as string);

    const handleSelectedDate = (newValue: Dayjs | null) => {
        setCalendarValue(newValue);
        setSelectedDate(formatearFecha(newValue!.toDate()));
    };

    const submitTurno = async () => {
        await postTurnoMedico(json, token);
    };

    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" component="div">
                    Solicitar turno médico
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Completa el formulario para solicitar un turno médico.
                </Typography>

                <SolicitanteRadioGroup
                    solicitante={solicitante}
                    handleRadioChange={handleRadioChange}
                />

                <BeneficiariosSelect 
                    solicitante={solicitante}
                    socio={socio}
                    selectedBeneficiario={selectedBeneficiario} 
                    handleSelectedBeneficiario={handleSelectedBeneficiario}
                />

                <EspecialidadSelect
                    medicos={medicos}
                    selectedEspecialidad={selectedEspecialidad}
                    handleSelectedEspecialidad={handleSelectedEspecialidad}
                />

                <ConsultorioSelect
                    medicos={medicos}
                    consultorios={consultorios}
                    selectedConsultorio={selectedConsultorio}
                    handleSelectedConsultorio={handleSelectedConsultorio}
                    selectedEspecialidad={selectedEspecialidad}
                    ubicaciones={ubicaciones}
                />

                <MedicoSelect
                    medicos={medicos}
                    consultorios={consultorios}
                    selectedMedico={selectedMedico}
                    handleSelectedMedico={handleSelectedMedico}
                    selectedConsultorio={selectedConsultorio}
                />

                <DateSelector
                    calendarValue={calendarValue}
                    handleSelectedDate={handleSelectedDate}
                    selectedHorario={selectedHorario}
                    consultorios={consultorios}
                    selectedConsultorio={selectedConsultorio}
                    selectedMedico={selectedMedico}
                    turnosMedicos={turnosMedicos}
                    handleSelectedHorario={handleSelectedHorario}
                />

                <MotivoConsulta motivo={motivo} handleMotivo={handleMotivo} />

                <Button variant="contained" sx={{ mt: 3, width: '100%' }} onClick={submitTurno}>
                    Agendar Turno Médico
                </Button>
            </CardContent>
        </React.Fragment>
    );
}

export default AppointmentCard;
