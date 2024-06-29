import React, { useEffect, useState } from 'react';
import { fetchConsultorios } from '../service/api';

interface Consultorio {
  id: number;
  nombre: string;
  // Agrega otros campos según tu modelo de datos
}

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
          <li key={consultorio.id}>{consultorio.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultoriosList;
