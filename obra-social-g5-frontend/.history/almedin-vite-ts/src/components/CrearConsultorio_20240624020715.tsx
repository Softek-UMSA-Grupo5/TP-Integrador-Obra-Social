import React, { useState, ChangeEvent, FormEvent } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { createConsultorio } from '../api/ConsultorioApi'; // Ajusta la ruta según tu estructura
import { createMedicoAndAssociateToConsultorio } from '../api/MedicoApi';

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
        <Card>
            <CardHeader title="Agregar Nuevo Consultorio" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="medico-nombre">Nombre del Médico</InputLabel>
                                <OutlinedInput
                                    id="medico-nombre"
                                    value={officeData.medico?.nombre || ''}
                                    onChange={handleMedicoChange}
                                    label="Nombre del Médico"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={createNewMedico}
                                        onChange={handleCheckboxChange}
                                        name="createNewMedico"
                                    />
                                }
                                label="Crear Nuevo Médico"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectExistingMedico}
                                        onChange={handleCheckboxChange}
                                        name="selectExistingMedico"
                                    />
                                }
                                label="Seleccionar Médico Existente"
                            />
                        </Grid>
                        {selectExistingMedico && (
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="medico-select-label">
                                        Seleccione un Médico
                                    </InputLabel>
                                    <Select
                                        labelId="medico-select-label"
                                        id="medico-select"
                                        value={selectedMedicoId}
                                        onChange={handleSelectExistingMedicoChange}
                                        label="Seleccione un Médico">
                                        {existingMedicos.map((medico) => (
                                            <MenuItem key={medico.id} value={medico.id.toString()}>
                                                {medico.nombre} {medico.apellido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddHorario}
                                style={{ marginRight: '10px' }}>
                                Agregar Horario
                            </Button>
                            {officeData.horariosDeAtencion.map((horario, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`diaSemana-${index}`}>
                                                    Día de la semana
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`diaSemana-${index}`}
                                                    name="diaSemana"
                                                    value={horario.diaSemana}
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Día de la semana"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`horaInicio-${index}`}>
                                                    Hora de Inicio
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`horaInicio-${index}`}
                                                    name="horaInicio"
                                                    value={horario.horaInicio}
                                                    type="time"
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Hora de Inicio"
                                                    inputProps={{
                                                        step: 300, // 5 minutes
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`horaFin-${index}`}>
                                                    Hora de Fin
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`horaFin-${index}`}
                                                    name="horaFin"
                                                    value={horario.horaFin}
                                                    type="time"
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Hora de Fin"
                                                    inputProps={{
                                                        step: 300, // 5 minutes
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton onClick={() => handleRemoveHorario(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-calle">Calle</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    label="Calle"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-ciudad">Ciudad</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    label="Ciudad"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-provincia">Provincia</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    label="Provincia"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-altura">Altura</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-altura"
                                    type="number"
                                    value={officeData.ubicacion.altura ?? ''}
                                    onChange={handleLocationChange}
                                    label="Altura"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Guardar Consultorio
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewOfficeForm;
