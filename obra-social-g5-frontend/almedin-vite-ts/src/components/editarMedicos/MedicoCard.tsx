import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';

interface MedicoCardProps {
  medico: MedicoResponseDto;
  consultoriosData: ConsultorioResponseDto[];
  onOpenModal: (medico: MedicoResponseDto) => void; // Añadido
}

const MedicoCard: React.FC<MedicoCardProps> = ({ medico, consultoriosData, onOpenModal }) => {
    const handleCardClick = () => {
        onOpenModal(medico);
    };
  const { nombre, apellido, especialidad, id } = medico;

  const consultoriosAsociados = consultoriosData.filter(consultorio => consultorio.medicoId === id);

  return (
    <Card onClick={handleCardClick} sx={{ height:'200px'}}>
      <CardContent >
        <Typography variant="h5">{`${nombre} ${apellido}`}</Typography>
        <Typography variant="body2">{`Especialidad: ${especialidad}`}</Typography>
        {consultoriosAsociados.length > 0 ? (
          consultoriosAsociados.map(consultorio => (
            <div key={consultorio.id} >
              <Typography variant="body2">{` ${consultorio.ubicacion.calle} ${consultorio.ubicacion.altura}, ${consultorio.ubicacion.ciudad}, ${consultorio.ubicacion.provincia}`}</Typography>
              <Typography variant="body2">Horarios de Atención:</Typography>
              {consultorio.horarioAtencion.map(horario => (
                <Typography key={horario.id} variant="body2">{`${horario.diaSemana}: ${horario.horaInicio} - ${horario.horaFin}`}</Typography>
              ))}
            </div>
          ))
        ) : (
          <Typography variant="body2">No hay consultorios asignados</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicoCard;
