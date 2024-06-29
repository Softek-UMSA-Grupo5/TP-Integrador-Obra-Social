import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AddNewOfficeForm: React.FC = () => {
  const [officeData, setOfficeData] = useState({
    horarioAtencion: [
      {
        diaSemana: 'LUNES',
        horaInicio: '13:45:30.123456789',
        horaFin: '13:45:30.123456789',
        codigo: ''
      }
    ],
    ubicacion: {
      ciudad: '8',
      provincia: '/',
      calle: 'J',
      altura: 0,
      codigo: ''
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setOfficeData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Aquí puedes realizar la llamada a la API para guardar los datos
      console.log(officeData);
      alert('Office saved successfully!');
    } catch (error) {
      console.error('Error saving office:', error);
      alert('Failed to save office. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <CardHeader title="Add New Office" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="doctor-name"
              label="Doctor's Name"
              variant="outlined"
              value={officeData.medico.nombre}
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id="start-time"
                label="Start Time"
                type="time"
                variant="outlined"
                value={officeData.horarioAtencion[0].horaInicio}
                onChange={handleChange}
              />
              <TextField
                id="end-time"
                label="End Time"
                type="time"
                variant="outlined"
                value={officeData.horarioAtencion[0].horaFin}
                onChange={handleChange}
              />
            </Stack>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              value={officeData.ubicacion.calle}
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id="city"
                label="City"
                variant="outlined"
                value={officeData.ubicacion.ciudad}
                onChange={handleChange}
              />
              <TextField
                id="state"
                label="State"
                variant="outlined"
                value={officeData.ubicacion.provincia}
                onChange={handleChange}
              />
              <TextField
                id="zip"
                label="Zip Code"
                variant="outlined"
                value={officeData.ubicacion.codigo}
                onChange={handleChange}
              />
            </Stack>
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
