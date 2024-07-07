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
import { formatearFecha } from '../../utils/formatearFecha.js';
import { getAllMedicos } from '../../assets/axios/MedicoApi.js';
import { getAllConsultorios } from '../../assets/axios/ConsultorioApi.js';
import { getTurnosMedicos, postTurnoMedico } from '../../assets/axios/TurnoMedicoApi.js';
import { MedicoResponseDto } from '../../assets/models/Medico.js';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio.js';
import { TurnoMedicoRequest, TurnoMedicoResponse } from '../../assets/models/TurnoMedico.js';
import { toast, ToastContainer } from 'react-toastify';

function AppointmentCard() {
    const [medicos, setMedicos] = React.useState<MedicoResponseDto[]>([]);
    const [consultorios, setConsultorios] = React.useState<ConsultorioResponseDto[]>([]);
    const [turnosMedicos, setTurnosMedicos] = React.useState<TurnoMedicoResponse[]>([]);

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
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    const json: TurnoMedicoRequest = {
        fecha: selectedDate,
        hora: +selectedHorario.split(':')[0],
        minutos: +selectedHorario.split(':')[1],
        motivoConsulta: motivo,
        medicoId: +selectedMedico,
        socioId: 1,
    };

    React.useEffect(() => {
        getAllMedicos()
            .then((response) => setMedicos(response))
            .then(() =>
                getAllConsultorios()
                    .then((response) => setConsultorios(response))
                    .then(() =>
                        getTurnosMedicos()
                            .then((response) => setTurnosMedicos(response))
                            .then(() => setIsLoaded(true))
                    )
            );
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

    const handleMotivo = (event: ChangeEvent<{ value: string }>) =>
        setMotivo(event.target.value as string);

    const handleSelectedDate = (newValue: Dayjs | null) => {
        setCalendarValue(newValue);
        setSelectedDate(formatearFecha(newValue!.toDate()));
    };

    const submitTurno = () => {
        postTurnoMedico(json).then(() => toast.success('Turno médico registrado exitosamente', {
            position: 'bottom-right',
        }));
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

                {isLoaded ? (
                    <>
                        <SolicitanteRadioGroup
                            solicitante={solicitante}
                            handleRadioChange={handleRadioChange}
                        />

                        <BeneficiariosSelect
                            solicitante={solicitante}
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

                        <Button
                            variant="contained"
                            sx={{ mt: 3, width: '100%' }}
                            onClick={submitTurno}>
                            Agendar Turno Médico
                        </Button>
                    </>
                ) : (
                    <Typography>Cargando...</Typography>
                )}
            </CardContent>
            <ToastContainer />
        </React.Fragment>
    );
}

export default AppointmentCard;
