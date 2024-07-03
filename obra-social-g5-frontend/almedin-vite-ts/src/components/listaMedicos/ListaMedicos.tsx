import { Container, Typography } from "@mui/material";
import SelectorsGrid from "./SelectorsGrid";
import CardsGrid from "./CardsGrid";
import { HorarioDiaSemanaEnum } from "../../assets/models/Horario";
//import { useEffect, useState } from "react";
//import { getAllMedicos } from "../../assets/axios/MedicoApi";
//import { MedicoResponseDto } from "../../assets/models/Medico";

/* Vieja versión hardcodeada
function ListaMedicos() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', margin: '20px 0 20px' }} variant="h4" component="h1">Lista de Médicos</Typography>
            <SelectorsGrid />
            <CardsGrid />
        </Container>
    );
}

export default ListaMedicos;
*/

const existingMedicos = [
    {
        id: 1,
        nombre: 'Matías',
        apellido: 'Giménez',
        telefono: '3456545581',
        email: 'matias@gmail.com',
        dni: 41907546,
        cuil: '23419075469',
        fechaNacimiento: '1990-05-16',
        estaEliminado: false,
        especialidad: 'General',
        consultoriosId: [1, 2],
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
        consultoriosId: [1, 2],
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
        consultoriosId: [1, 2],
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
        consultoriosId: [1, 2],
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
        consultoriosId: [1, 2],
    },
    {
        id: 5,
        nombre: 'Alexis',
        apellido: 'Luna',
        telefono: '2992134567',
        email: 'luna@mail.com',
        dni: 44100200,
        cuil: '20441002004',
        fechaNacimiento: '2001-03-09',
        estaEliminado: false,
        especialidad: 'Dermatólogo',
        consultoriosId: [1, 2],
    },
];

const existingConsultorios = [
    {
        id: 1,
        horarioAtencion: [
            {
                id: 31,
                diaSemana: HorarioDiaSemanaEnum.LUNES,
                horaInicio: '08:30:00',
                horaFin: '12:30:00',
                estaEliminado: false
            },
            {
                id: 32,
                diaSemana: HorarioDiaSemanaEnum.MARTES,
                horaInicio: '10:00:00',
                horaFin: '15:00:00',
                estaEliminado: false
            },
            {
                id: 33,
                diaSemana: HorarioDiaSemanaEnum.MIERCOLES,
                horaInicio: '11:00:00',
                horaFin: '18:00:00',
                estaEliminado: false
            }
        ],
        ubicacion: {
            id: 4,
            ciudad: 'Godoy Cruz',
            provincia: 'Mendoza',
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
                id: 10,
                diaSemana: HorarioDiaSemanaEnum.JUEVES,
                horaInicio: '09:40:00',
                horaFin: '14:30:00',
                estaEliminado: false
            },
            {
                id: 11,
                diaSemana: HorarioDiaSemanaEnum.VIERNES,
                horaInicio: '07:00:00',
                horaFin: '12:00:00',
                estaEliminado: false
            }
        ],
        ubicacion: {
            id: 5,
            ciudad: 'Maipú',
            provincia: 'Mendoza',
            calle: 'Belgrano',
            altura: 230,
            estaEliminado: false,
            codigo: '2d14a5a9-b',
        },
        estaEliminado: false,
        codigo: '691ea',
        medicoId: 2,
    }
];

const ListaMedicos: React.FC = () => {
    /*
    const [existingMedicos, setExistingMedicos] = useState<MedicoResponseDto[]>([]);
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const medicos = await getAllMedicos();
                setExistingMedicos(medicos);
            } catch (error) {
                console.error('Error fetching medicos:', error);
            }
        };
        fetchMedicos();
    }, []);
    */
    
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', margin: '20px 0 20px' }} variant="h4" component="h1">Lista de Médicos</Typography>
            <SelectorsGrid />
            <CardsGrid existingMedicos={existingMedicos} existingConsultorios={existingConsultorios} />
        </Container>
    );
}

export default ListaMedicos;