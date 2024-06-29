import React, { useEffect, useState } from 'react';
import { fetchConsultorios } from '../service/api';
import { Consultorio } from '../models/Consultorio';

const ConsultoriosList: React.FC = () => {
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);

  useEffect(() => {
    const fetchAndSetConsultorios = async () => {
      try {
        const consultoriosData = await fetchConsultorios();
        setConsultorios(consultoriosData);
      } catch (error) {
        console.error("Error fetching consultorios:", error);
      }
    };

    fetchAndSetConsultorios();
  }, []);

  return (
    <div>
      <h2>Listado de Consultorios</h2>
      {consultorios.map((consultorio, index) => (
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

export default ConsultoriosList;
