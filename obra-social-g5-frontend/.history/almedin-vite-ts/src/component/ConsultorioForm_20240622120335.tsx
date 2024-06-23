import React, { useState, useEffect } from 'react';
import { Consultorio } from '../models/Consultorio'; // Asegúrate de importar la interfaz Consultorio

interface Props {
  consultorios: Consultorio[];
}

const ComponenteForm: React.FC<Props> = ({ consultorios }) => {
  const [filteredConsultorios, setFilteredConsultorios] = useState<Consultorio[]>([]);

  useEffect(() => {
    // Filtrar y procesar los datos de consultorios si es necesario
    const filtered = consultorios.filter(consultorio => !consultorio.estaEliminado && !consultorio.ubicacion.estaEliminado);
    setFilteredConsultorios(filtered);
  }, [consultorios]);

  const ConsultorioList = () => {
    return (
      <div>
        <h2>Consultorios</h2>
        {filteredConsultorios.map((consultorio, index) => (
          <div key={index}>
            <h3>{consultorio.ubicacion.ciudad}, {consultorio.ubicacion.direccion}</h3>
            <p>{consultorio.ubicacion.direccion}</p>
            <ul>
              {consultorio.horarioAtencion.map((horario, idx) => (
                <li key={idx}>
                  {horario.diaSemana}: {horario.horaInicio} - {horario.horaFin}
                </li>
              ))}
            </ul>
            <p>Medico: {consultorio.medico.nombre} - Especialidad: {consultorio.medico.especialidad}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Componente Form</h1>
      <ConsultorioList />
    </div>
  );
};

export default ComponenteForm;
