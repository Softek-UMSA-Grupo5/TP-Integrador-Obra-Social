import React, { useEffect, useState } from 'react';
import { fetchConsultorios } from '../service/api';
import { Consultorio } from '../models/Consultorio';

const ConsultoriosList: React.FC = () => {
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getConsultorios = async () => {
      try {
        const data = await fetchConsultorios();
        setConsultorios(data);
      } catch (error) {
        setError('Error fetching consultorios');
      } finally {
        setLoading(false);
      }
    };

    getConsultorios();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Consultorios</h1>
      <ul>
        {consultorios.map((consultorio) => (
          <li key={consultorio.id}>
            <p>Código: {consultorio.codigo}</p>
            <p>Ubicación: {consultorio.ubicacion.direccion}, {consultorio.ubicacion.ciudad}</p>
            <p>Médico: {consultorio.medico.nombre} ({consultorio.medico.especialidad})</p>
            <p>Horarios de atención:</p>
            <ul>
              {consultorio.horarioAtencion.map((horario) => (
                <li key={horario.id}>
                  {horario.diaSemana}: {horario.horaInicio} - {horario.horaFin}
                </li>
              ))}
            </ul>
            <p>¿Eliminado?: {consultorio.estaEliminado ? 'Sí' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultoriosList;
