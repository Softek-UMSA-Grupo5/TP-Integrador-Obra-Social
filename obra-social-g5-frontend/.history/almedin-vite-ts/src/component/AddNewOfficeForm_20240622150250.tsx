import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      <CardHeader title="Add New Office" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="nombre"
                label="Nombre del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.nombre}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="apellido"
                label="Apellido del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.apellido}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="telefono"
                label="Teléfono del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.telefono}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.email}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dni"
                label="DNI del Médico"
                variant="outlined"
                fullWidth
                type="number"
                value={officeData.medico.dni}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fechaNacimiento"
                label="Fecha de Nacimiento del Médico"
                variant="outlined"
                type="date"
                fullWidth
                value={officeData.medico.fechaNacimiento}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="cuil"
                label="CUIL del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.cuil}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="especialidad"
                label="Especialidad del Médico"
                variant="outlined"
                fullWidth
                value={officeData.medico.especialidad}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="calle"
                label="Calle"
                variant="outlined"
                fullWidth
                value={officeData.ubicacion.calle}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="altura"
                label="Altura"
                variant="outlined"
                fullWidth
                type="number"
                value={officeData.ubicacion.altura}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
             />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ciudad"
                label="Ciudad"
                variant="outlined"
                fullWidth
                value={officeData.ubicacion.ciudad}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="provincia"
                label="Provincia"
                variant="outlined"
                fullWidth
                value={officeData.ubicacion.provincia}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {officeData.horarioAtencion.map((horario, index) => (
              <Grid container spacing={4} key={index}>
                <Grid item xs={5}>
                  <TextField
                    name={`horarioAtencion[${index}].diaSemana`}
                    label="Día de la Semana"
                    variant="outlined"
                    fullWidth
                    value={horario.diaSemana}
                    onChange={event => handleHorarioChange(index, event)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name={`horarioAtencion[${index}].horaInicio`}
                    label="Hora de Inicio"
                    variant="outlined"
                    type="time"
                    fullWidth
                    value={horario.horaInicio}
                    onChange={event => handleHorarioChange(index, event)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name={`horarioAtencion[${index}].horaFin`}
                    label="Hora de Fin"
                    variant="outlined"
                    type="time"
                    fullWidth
                    value={horario.horaFin}
                    onChange={event => handleHorarioChange(index, event)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
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
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleAddHorario}
                >
                  Add Horario
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CardActions>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button type="submit" variant="contained" color="dark">
                  Guardar Consultorio
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewOfficeForm;
