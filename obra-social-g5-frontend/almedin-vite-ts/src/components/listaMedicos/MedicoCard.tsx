import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import React from 'react';

interface MedicosExistentesProps {
    medico: MedicoResponseDto;
    existingConsultorios: ConsultorioResponseDto[];
}

const MedicoCard: React.FC<MedicosExistentesProps> = ({
    medico,
    existingConsultorios,
}) => {
    const getConsultoriosPorMedico = (consultoriosId: number): ConsultorioResponseDto[] => {
        return existingConsultorios.filter(
            (consultorio) => consultorio.medicoId === consultoriosId
        );
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        }
                        title={medico.nombre + ' ' + medico.apellido}
                        titleTypographyProps={{ fontWeight: '700', fontSize: '18px' }}
                        subheader={medico.especialidad}
                        subheaderTypographyProps={{ fontWeight: '500', fontSize: '16px' }}
                    />
                    {getConsultoriosPorMedico(medico.id).map((consultorio) => (
                        <CardContent>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                                <LocationOnOutlinedIcon sx={{ fontSize: 'medium' }} />
                                {consultorio.ubicacion.calle} {consultorio.ubicacion.altura},{' '}
                                {consultorio.ubicacion.ciudad},{' '}
                                {consultorio.ubicacion.provincia}.
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {consultorio.horarioAtencion.map((horario, index) => (
                                        <li key={index} style={{ display: 'flex', gap: '4px' }}>
                                            <AccessTimeIcon sx={{ fontSize: 'medium' }} />
                                            {horario.diaSemana}: {horario.horaInicio} -{' '}
                                            {horario.horaFin}
                                        </li>
                                    ))}
                                </ul>
                            </Typography>
                        </CardContent>
                    ))}
                </Card>
            </Grid>
        </>
    );
};

export default MedicoCard;