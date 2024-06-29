import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

const medicos = [
  {
      id: 1,
      nombre: 'Mauricio',
      apellido: 'Isla',
      telefono: '3456545581',
      email: 'lucianomalleret8@gmail.com',
      dni: 41907546,
      cuil: '23419075469',
      fechaNacimiento: '1999-05-16',
      estaEliminado: false,
      especialidad: 'Traumatólogo',
  },
  {
      id: 2,
      nombre: 'Rodrigo',
      apellido: 'Rey',
      telefono: '3454050829',
      email: 'pablomoya@gmail.com',
      dni: 40562846,
      cuil: '23405628469',
      fechaNacimiento: '1998-02-04',
      estaEliminado: false,
      especialidad: 'Oftalmólogo',
  },
  {
      id: 3,
      nombre: 'Iván',
      apellido: 'Marcone',
      telefono: '3454123589',
      email: 'ignacioL@gmail.com',
      dni: 41381776,
      cuil: '23413817769',
      fechaNacimiento: '1998-04-24',
      estaEliminado: false,
      especialidad: 'Pediatra',
  },
  {
      id: 4,
      nombre: 'Gabriel',
      apellido: 'Ávalos',
      telefono: '3454857945',
      email: 'algo@mail.com',
      dni: 45789651,
      cuil: '23457896519',
      fechaNacimiento: '2022-03-09',
      estaEliminado: false,
      especialidad: 'General',
  },
  {
      id: 5,
      nombre: 'Santiago',
      apellido: 'Millán',
      telefono: '2616604517',
      email: 'santi@mail.com',
      dni: 46700800,
      cuil: '20467008004',
      fechaNacimiento: '2002-03-09',
      estaEliminado: false,
      especialidad: 'Odontólogo',
  },
];

const consultorios = [
  {
      id: 1,
      horarioAtencion: [
          {
              id: 31,
              diaSemana: 'LUNES',
              horaInicio: '08:30:00',
              horaFin: '12:30:00',
              estaEliminado: false,
              codigo: 'bbf39',
          },
          {
              id: 32,
              diaSemana: 'MARTES',
              horaInicio: '10:00:00',
              horaFin: '15:00:00',
              estaEliminado: false,
              codigo: '959d1',
          },
          {
              id: 33,
              diaSemana: 'MIERCOLES',
              horaInicio: '11:00:00',
              horaFin: '18:00:00',
              estaEliminado: false,
              codigo: '79d32',
          },
      ],
      ubicacion: {
          id: 4,
          ciudad: 'Gualeguaychú',
          provincia: 'Entre Ríos',
          calle: 'Urquiza',
          altura: 750,
          estaEliminado: false,
          codigo: '1d14a5a9-a',
      },
      estaEliminado: false,
      codigo: '691ee',
      medicoId: 1,
  },
  {
      id: 2,
      horarioAtencion: [
          {
              id: 34,
              diaSemana: 'LUNES',
              horaInicio: '08:00:00',
              horaFin: '13:00:00',
              estaEliminado: false,
              codigo: '9e251',
          },
          {
              id: 35,
              diaSemana: 'MIERCOLES',
              horaInicio: '09:00:00',
              horaFin: '14:00:00',
              estaEliminado: false,
              codigo: '42026',
          },
          {
              id: 36,
              diaSemana: 'VIERNES',
              horaInicio: '10:00:00',
              horaFin: '16:00:00',
              estaEliminado: false,
              codigo: '78a82',
          },
      ],
      ubicacion: {
          id: 5,
          ciudad: 'Concordia',
          provincia: 'Entre Ríos',
          calle: 'San Lorenzo',
          altura: 1234,
          estaEliminado: false,
          codigo: '8be96c62-c',
      },
      estaEliminado: false,
      codigo: '6ab83',
      medicoId: 2,
  },
];

const medicoConConsultorio = medicos.map(medico => {
  const consultorio = consultorios.find(c => c.medicoId === medico.id);
  return { ...medico, consultorio };
});

function MedicoCard() {
  return (
    <>
      {medicoConConsultorio.map(medico => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Card>
            <CardHeader
              avatar={<Avatar>
                <PersonIcon />
              </Avatar>}
              title={medico.nombre + " " + medico.apellido}
              titleTypographyProps={{ fontWeight: "700", fontSize: "18px" }}
              subheader={medico.especialidad}
              subheaderTypographyProps={{ fontWeight: "500", fontSize: "16px" }} />
            <CardContent>
              <Typography color="text.secondary" variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                <AccessTimeIcon sx={{ fontSize: "medium" }} />{medico.consultorio?.id}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                <LocationOnOutlinedIcon sx={{ fontSize: "medium" }} />{medico.consultorio?.ubicacion.calle} {medico.consultorio?.ubicacion.altura}, {medico.consultorio?.ubicacion.ciudad} {medico.consultorio?.ubicacion.provincia}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default MedicoCard;
