// components/AddNewOfficeForm.tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Label,
  Input,
  Button,
} from '@mui/material';
import { saveOffice } from '../service/api';
import OfficeData from '../models/Office';

const AddNewOfficeForm: React.FC = () => {
  const [officeData, setOfficeData] = useState<OfficeData>({
    horarioAtencion: [
      {
        diaSemana: 'LUNES',
        horaInicio: '13:45:30.123456789',
        horaFin: '13:45:30.123456789',
        codigo: 'string'
      }
    ],
    ubicacion: {
      ciudad: '8',
      provincia: '/',
      calle: 'J',
      altura: 0,
      codigo: 'string'
    },
    medico: {
      nombre: 'string',
      apellido: 'string',
      telefono: 'string',
      email: 'string',
      dni: 0,
      fechaNacimiento: '2022-03-10',
      cuil: 'string',
      especialidad: 'string'
    },
    codigo: 'string'
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
      await saveOffice(officeData);
      alert('Office saved successfully!');
      // Aquí podrías redirigir a otra página o realizar otra acción después de guardar
    } catch (error) {
      console.error('Error saving office:', error);
      alert('Failed to save office. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New Office</CardTitle>
        <CardDescription>Enter the details of the new office location.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="doctor-name">Doctor's Name</Label>
            <Input id="doctor-name" placeholder="Enter doctor's name" onChange={handleChange} value={officeData.medico.nombre} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Opening Hours</Label>
              <div className="flex items-center gap-2">
                <Input id="start-time" type="time" placeholder="Start Time" onChange={handleChange} value={officeData.horarioAtencion[0].horaInicio} />
                <span>-</span>
                <Input id="end-time" type="time" placeholder="End Time" onChange={handleChange} value={officeData.horarioAtencion[0].horaFin} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter office address" onChange={handleChange} value={officeData.ubicacion.calle} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" onChange={handleChange} value={officeData.ubicacion.ciudad} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Enter state" onChange={handleChange} value={officeData.ubicacion.provincia} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Zip Code</Label>
              <Input id="zip" placeholder="Enter zip code" onChange={handleChange} value={officeData.ubicacion.codigo} />
            </div>
          </div>
          <CardFooter>
            <Button type="submit" variant="contained" color="primary">
              Save Office
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewOfficeForm;
