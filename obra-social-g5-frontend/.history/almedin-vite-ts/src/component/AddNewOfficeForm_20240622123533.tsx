// components/AddNewOfficeForm.tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
} from '@mui/material'; // Importa los componentes de Material-UI que necesites
import OfficeData from '../models/Office';
import { saveOffice } from '../service/api';

const AddNewOfficeForm: React.FC = () => {
  const [formData, setFormData] = useState<OfficeData>({
    horarioAtencion: [{
      diaSemana: 'LUNES', // Valor por defecto
      horaInicio: '',
      horaFin: '',
      codigo: 'string'
    }],
    ubicacion: {
      ciudad: '8', // Valor por defecto
      provincia: '/',
      calle: 'J',
      altura: 0,
      codigo: 'string'
    },
    medico: {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      dni: 0,
      fechaNacimiento: '2022-03-10',
      cuil: '',
      especialidad: ''
    },
    codigo: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Llamar al servicio API para guardar el consultorio
      const response = await saveOffice(formData);

      // Manejar la respuesta del servicio
      console.log('Respuesta del servidor:', response);

      // Limpiar el formulario o manejar el éxito de la operación
      // setFormData({ ...initialState });
    } catch (error) {
      console.error('Error al guardar el consultorio:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader title="Add New Office" subheader="Enter the details of the new office location." />
      <CardContent className="space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="start-time"
              label="Opening Hours - Start Time"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="end-time"
              label="Opening Hours - End Time"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="doctor-name"
              label="Doctor's Name"
              placeholder="Enter doctor's name"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              label="Address"
              placeholder="Enter office address"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="city"
              label="City"
              placeholder="Enter city"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="state"
              label="State"
              placeholder="Enter state"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="zip"
              label="Zip Code"
              placeholder="Enter zip code"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Save Office
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddNewOfficeForm;
