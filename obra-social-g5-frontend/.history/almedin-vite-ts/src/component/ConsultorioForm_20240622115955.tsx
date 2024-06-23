import React, { useState, useEffect } from 'react';
import { Consultorio } from '../models/Consultorio'; // Import the interfaces

interface Props {
  consultorios: Consultorio[];
}

const ConsultorioList: React.FC<Props> = ({ consultorios }) => {
  const [filteredConsultorios, setFilteredConsultorios] = useState<Consultorio[]>([]);

  useEffect(() => {
    // Filter and transform the data here
    const filtered = consultorios.filter(consultorio => !consultorio.estaEliminado && !consultorio.ubicacion.estaEliminado);

    setFilteredConsultorios(filtered);
  }, [consultorios]);

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

export default ConsultorioList;
