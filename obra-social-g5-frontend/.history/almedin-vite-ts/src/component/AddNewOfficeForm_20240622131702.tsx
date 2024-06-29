import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import OfficeData from '../models/Office';
import { saveOffice } from '../service/api';
import { Grid } from '@mui/material';

const AddNewOfficeForm: React.FC = () => {
  const initialHorario = {
    diaSemana: '',
    horaInicio: '',
    horaFin: ''
  };

  const [officeData, setOfficeData] = useState<OfficeData>({
    horarioAtencion: [initialHorario],
    ubicacion: {
      ciudad: '',
      provincia: '',
      calle: '',
      altura: 0
    },
    medico: {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      dni: 0,
      fechaNacimiento: '',
      cuil: '',
      especialidad: ''
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setOfficeData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleHorarioChange = (index: number, event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setOfficeData(prevData => ({
      ...prevData,
      horarioAtencion: prevData.horarioAtencion.map((horario, idx) => {
        if (idx === index) {
          return {
            ...horario,
            [name!]: value
          };
        }
        return horario;
      })
    }));
  };

  const handleAddHorario = () => {
    setOfficeData(prevData => ({
      ...prevData,
      horarioAtencion: [
        ...prevData.horarioAtencion,
        initialHorario
      ]
    }));
  };

  const handleRemoveHorario = (index: number) => {
    setOfficeData(prevData => ({
      ...prevData,
      horarioAtencion: prevData.horarioAtencion.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await saveOffice(officeData);
      alert('Office saved successfully!');
      // Aquí podrías redirigir a otra página o realizar otra acción después de guardar
    } catch (error) {
      console.error('Error saving office:', error);
      alert('Failed to save office. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, me: 100, my: 'auto' }}>
      <CardHeader title="Add New Office" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              id="nombre"
              label="Nombre del Médico"
              variant="outlined"
              value={officeData.medico.nombre}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="apellido"
              label="Apellido del Médico"
              variant="outlined"
              value={officeData.medico.apellido}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="telefono"
              label="Teléfono del Médico"
              variant="outlined"
              value={officeData.medico.telefono}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="email"
              label="Email del Médico"
              variant="outlined"
              value={officeData.medico.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="dni"
              label="DNI del Médico"
              variant="outlined"
              type="number"
              value={officeData.medico.dni}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="fechaNacimiento"
              label="Fecha de Nacimiento del Médico"
              variant="outlined"
              type="date"
              value={officeData.medico.fechaNacimiento}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="cuil"
              label="CUIL del Médico"
              variant="outlined"
              value={officeData.medico.cuil}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="especialidad"
              label="Especialidad del Médico"
              variant="outlined"
              value={officeData.medico.especialidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="calle"
              label="Calle"
              variant="outlined"
              value={officeData.ubicacion.calle}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="altura"
              label="Altura"
              variant="outlined"
              type="number"
              value={officeData.ubicacion.altura}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="ciudad"
              label="Ciudad"
              variant="outlined"
              value={officeData.ubicacion.ciudad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="provincia"
              label="Provincia"
              variant="outlined"
              value={officeData.ubicacion.provincia}
              onChange={handleChange}
              fullWidth
            />

            {officeData.horarioAtencion.map((horario, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <TextField
                    name={`horarioAtencion[${index}].diaSemana`}
                    label="Día de la Semana"
                    variant="outlined"
                    value={horario.diaSemana}
                    onChange={event => handleHorarioChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name={`horarioAtencion[${index}].horaInicio`}
                    label="Hora de Inicio"
                    variant="outlined"
                    type="time"
                    value={horario.horaInicio}
                    onChange={event => handleHorarioChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name={`horarioAtencion[${index}].horaFin`}
                    label="Hora de Fin"
                    variant="outlined"
                    type="time"
                    value={horario.horaFin}
                    onChange={event => handleHorarioChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveHorario(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddHorario}
            >
              Add Horario
            </Button>
          </Stack>
          <CardActions>
            <Button type="submit" variant="contained" color="primary">
              Save Office
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewOfficeForm;
