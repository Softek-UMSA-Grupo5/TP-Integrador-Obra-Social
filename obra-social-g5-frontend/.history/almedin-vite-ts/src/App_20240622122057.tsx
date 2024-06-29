import React from 'react';
import ConsultorioDetail from './ConsultorioDetail';
import { Consultorio } from './models/Consultorio'; // Asegúrate de importar la interfaz Consultorio adecuada

const mockConsultorio: Consultorio = {
  id: 1,
  codigo: 'ABC123',
  ubicacion: {
    id: 1,
    ciudad: 'Ciudad Ejemplo',
    provincia: 'Provincia Ejemplo',
    calle: 'Calle Ejemplo',
    altura: 123,
    consultorios: []
  },
  estaEliminado: false,
  medico: {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '123456789',
    email: 'juan.perez@example.com',
    dni: 12345678,
    fechaNacimiento: '1990-01-01',
    cuil: '20-12345678-9',
    especialidad: 'Médico General',
    consultorios: []
  },
  horarioAtencion: [
    {
      id: 1,
      diaSemana: 'LUNES',
      horaInicio: '08:00',
      horaFin: '16:00',
      consultorio: null // Aquí deberías establecer la referencia al consultorio correspondiente si fuera necesario
    },
    {
      id: 2,
      diaSemana: 'MARTES',
      horaInicio: '08:00',
      horaFin: '16:00',
      consultorio: null // Aquí deberías establecer la referencia al consultorio correspondiente si fuera necesario
    }
  ]
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Detalle de Consultorio</h1>
      <ConsultorioDetail consultorio={mockConsultorio} />
    </div>
  );
};

export default App;
