// components/AddNewOfficeForm.tsx
import React, { useState } from 'react';
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
    <form onSubmit={handleSubmit}>
      {/* Aquí va tu formulario JSX */}
    </form>
  );
};

export default AddNewOfficeForm;
