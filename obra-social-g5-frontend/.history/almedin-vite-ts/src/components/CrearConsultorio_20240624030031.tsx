import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    IconButton,
    Button,
    SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

// Define el tipo de datos para el estado del formulario
interface OfficeData {
    ubicacion: {
        calle: string;
        altura: number | undefined;
        ciudad: string;
        provincia: string;
    };
    horarioAtencion: {
        diaSemana: string;
        horaInicio: string;
        horaFin: string;
    }[];
    medico: {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        dni: number | undefined;
        fechaNacimiento: string;
        cuil: string;
        especialidad: string;
    };
}

// Componente principal
const ConsultorioForm: React.FC = () => {
    // Estado inicial del formulario
    const [officeData, setOfficeData] = useState<OfficeData>({
        ubicacion: {
            calle: '',
            altura: undefined,
            ciudad: '',
            provincia: '',
        },
        horarioAtencion: [
            {
                diaSemana: '',
                horaInicio: '',
                horaFin: '',
            },
        ],
        medico: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            dni: undefined,
            fechaNacimiento: '',
            cuil: '',
            especialidad: '',
        },
    });

    // Función para manejar cambios en el estado del formulario
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOfficeData({
            ...officeData,
            medico: {
                ...officeData.medico,
                [event.target.id]: event.target.value,
            },
        });
    };

    // Función para manejar cambios en la ubicación del consultorio
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOfficeData({
            ...officeData,
            ubicacion: {
                ...officeData.ubicacion,
                [event.target.id]: event.target.value,
            },
        });
    };

    // Función para manejar cambios en el horario de atención
    const handleSelectChange = (index: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const updatedHorarios = [...officeData.horarioAtencion];
        updatedHorarios[index].diaSemana = event.target.value as string;
        setOfficeData({
            ...officeData,
            horarioAtencion: updatedHorarios,
        });
    };

    // Función para manejar cambios en las horas de inicio y fin del horario de atención
    const handleHorarioChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedHorarios = [...officeData.horarioAtencion];
        updatedHorarios[index] = {
            ...updatedHorarios[index],
            [name]: value,
        };
        setOfficeData({
            ...officeData,
            horarioAtencion: updatedHorarios,
        });
    };

    // Función para eliminar un horario de atención
    const handleRemoveHorario = (index: number) => {
        const updatedHorarios = [...officeData.horarioAtencion];
        updatedHorarios.splice(index, 1);
        setOfficeData({
            ...officeData,
            horarioAtencion: updatedHorarios,
        });
    };

    // Función para agregar un nuevo horario de atención
    const handleAddHorario = () => {
        setOfficeData({
            ...officeData,
            horarioAtencion: [
                ...officeData.horarioAtencion,
                {
                    diaSemana: '',
                    horaInicio: '',
                    horaFin: '',
                },
            ],
        });
    };

    // Función para manejar el submit del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Aquí deberías llamar a tu función para actualizar el consultorio
            await updateConsultorio(officeData);
            // Luego podrías mostrar algún mensaje de éxito o redirigir al usuario
            console.log('Formulario enviado con éxito:', officeData);
            alert('Formulario enviado con éxito!');
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario. Por favor, inténtelo nuevamente.');
        }
    };

    // Función para realizar la solicitud de actualización del consultorio
    const updateConsultorio = async (consultorioData: OfficeData) => {
        try {
            const response = await axios.put('/consultorios', consultorioData);
            console.log('Respuesta del servidor:', response.data);
            // Aquí podrías manejar la respuesta del servidor si es necesario
        } catch (error) {
            throw new Error('Error al actualizar el consultorio');
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 70, my: 'auto' }}>
            <CardHeader
                title="Actualizar Consultorio"
                subheader="Modificación de consultorio en el sistema"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Calle</InputLabel>
                                <OutlinedInput
                                    id="calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la calle del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Altura</InputLabel>
                                <OutlinedInput
                                    id="altura"
                                    type="text"
                                    value={
                                        officeData.ubicacion.altura !== undefined
                                            ? officeData.ubicacion.altura.toString()
                                            : ''
                                    }
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la altura del consultorio.."
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Ciudad</InputLabel>
                                <OutlinedInput
                                    id="ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la ciudad del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Provincia</InputLabel>
                                <OutlinedInput
                                    id="provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la provincia del consultorio.."
                                />
                            </FormControl>
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel shrink>Día de la Semana</InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            onChange={(event: SelectChangeEvent<string>) =>
                                                handleSelectChange(index, event)
                                            }
                                            label="Día de la Semana">
                                            <MenuItem value="LUNES">LUNES</MenuItem>
                                            <MenuItem value="MARTES">MARTES</MenuItem>
                                            <MenuItem value="MIÉRCOLES">MIERCOLES</MenuItem>
                                            <MenuItem value="JUEVES">JUEVES</MenuItem>
                                            <MenuItem value="VIERNES">VIERNES</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                        <InputLabel shrink>Hora de Inicio</InputLabel>
                                        <OutlinedInput
                                            name="horaInicio"
                                            type="time"
                                            value={horario.horaInicio}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
                                            inputProps={{ step: 300 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                        <InputLabel shrink>Hora de Fin</InputLabel>
                                        <OutlinedInput
                                            name="horaFin"
                                            type="time"
                                            value={horario.horaFin}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
                                            inputProps={{ step: 300 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <IconButton
                                        aria-label="delete"
                                        size="large"
                                        onClick={() => handleRemoveHorario(index)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, width: '100%' }}
                        onClick={handleAddHorario}>
                        Agregar Horario
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, width: '100%' }}
                        type="submit">
                        Crear Consultorio
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
export default ConsultorioForm;
