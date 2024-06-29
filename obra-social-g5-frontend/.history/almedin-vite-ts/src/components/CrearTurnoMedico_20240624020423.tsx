import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createConsultorio, createMedicoAndAssociateToConsultorio } from '../api'; // Ajusta la ruta según tu estructura

interface ConsultorioForm {
  nombre: string;
  direccion: string;
  // Otros campos del consultorio
}

interface MedicoForm {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
}

const AddNewOfficeForm: React.FC = () => {
  const [consultorio, setConsultorio] = useState<ConsultorioForm>({
    nombre: '',
    direccion: '',
    // Otros campos del consultorio
  });

  const [medico, setMedico] = useState<MedicoForm>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    dni: 0,
    fechaNacimiento: '',
    cuil: '',
    especialidad: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 1. Crear el consultorio
      const newConsultorio = await createConsultorio(consultorio);
      console.log('Consultorio creado exitosamente:', newConsultorio);

      // 2. Crear el médico y asociarlo al consultorio
      const newMedico = await createMedicoAndAssociateToConsultorio(medico, newConsultorio.id);
      console.log('Médico creado y asociado al consultorio exitosamente:', newMedico);

      alert('Consultorio y médico creados exitosamente!');
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('No se pudo completar la operación. Por favor, inténtelo nuevamente.');
    }
  };

  const handleConsultorioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setConsultorio((prevConsultorio) => ({
      ...prevConsultorio,
      [id]: value,
    }));
  };

  const handleMedicoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setMedico((prevMedico) => ({
      ...prevMedico,
      [id]: value,
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
                    <FormLabel
                        id="beneficiarios-turno"
                        className={
                            solicitante === 'Para un beneficiario' ? 'label' : 'label-disabled'
                        }>
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
                                {beneficiario.apellido.concat(
                                    ' ',
                                    beneficiario.nombre,
                                    ', ',
                                    beneficiario.dni
                                )}
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
                        value={selectedEspecialidad}
                        onChange={handleSelectedEspecialidad}
                        fullWidth>
                        {especialidadesSet.map((especialidad, index) => (
                            <MenuItem key={index} value={especialidad}>
                                {especialidad}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel
                        id="consultorio-turno"
                        className={selectedEspecialidad !== '' ? 'label' : 'label-disabled'}>
                        Consultorio
                    </FormLabel>
                    <Select
                        labelId="consultorio-turno"
                        id="consultorio"
                        value={consultorio}
                        onChange={handleConsultorio}
                        fullWidth
                        disabled={selectedEspecialidad === ''}>
                        {ubicaciones
                            .filter((u) => ubicacionSet.includes(u.id))
                            .map((u) => (
                                <MenuItem key={u.id} value={u.id}>
                                    {Object.values(u).join(', ')}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <FormLabel
                        id="medico-turno"
                        className={consultorio !== '' ? 'label' : 'label-disabled'}>
                        Medico
                    </FormLabel>
                    <Select
                        labelId="medico-turno"
                        id="medico"
                        value={medico}
                        onChange={handleMedico}
                        fullWidth
                        disabled={consultorio === ''}>
                        {medicos
                            .filter((medico) =>
                                consultorios
                                    .filter((c) => c.ubicacion.id === +consultorio)
                                    .map((c) => c.medicoId)
                                    .includes(medico.id)
                            )
                            .map((medico) => (
                                <MenuItem key={medico.id} value={medico.id}>
                                    {medico.nombre + ' ' + medico.apellido}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

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
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ height: 300, overflowY: 'scroll' }}>
                        {rows.length ? (
                            <RadioGroup
                                value={horario}
                                onChange={handleHorario}
                                name="radio-buttons-group">
                                {rows.map((row) => (
                                    <FormControlLabel
                                        key={row.id}
                                        value={row.horario}
                                        control={<Radio />}
                                        label={row.horario}
                                        disabled={turnoMedico.some(
                                            (c) =>
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
