import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    IconButton,
    Button,
    SelectChangeEvent,
} from '@mui/material';

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
                diaSemana: 'LUNES',
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
            // Aquí deberías llamar a tu función para crear el consultorio
            // Por ejemplo: const newConsultorio = await createConsultorio(officeData);
            // Luego podrías mostrar algún mensaje de éxito o redirigir al usuario
            console.log('Formulario enviado con éxito:', officeData);
            alert('Formulario enviado con éxito!');
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario. Por favor, inténtelo nuevamente.');
        }
    };

     return (
        <Card sx={{ maxWidth: 600, mx: 70, my: 'auto' }}>
            <CardHeader
                title="Agregar nuevo Consultorio"
                subheader="Carga de nuevo consultorio en el sistema"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                       
                        <Grid item xs={6}>
                            <TextField
                                id="calle"
                                label="Calle"
                                variant="outlined"
                                placeholder="Ingrese la calle del consultorio.."
                                fullWidth
                                value={officeData.ubicacion.calle}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="altura"
                                label="Altura"
                                variant="outlined"
                                placeholder="Ingrese la altura del consultorio.."
                                fullWidth
                                type="text"
                                value={
                                    officeData.ubicacion.altura !== undefined
                                        ? officeData.ubicacion.altura.toString()
                                        : ''
                                }
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    style: {
                                        MozAppearance: 'textfield',
                                        appearance: 'textfield',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="ciudad"
                                label="Ciudad"
                                variant="outlined"
                                placeholder="Ingrese la ciudad del consultorio.."
                                fullWidth
                                value={officeData.ubicacion.ciudad}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="provincia"
                                label="Provincia"
                                variant="outlined"
                                placeholder="Ingrese la provincia del consultorio.."
                                fullWidth
                                value={officeData.ubicacion.provincia}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Día de la Semana</InputLabel>
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
                                    <TextField
                                        name="horaInicio"
                                        label="Hora de Inicio"
                                        variant="outlined"
                                        type="time"
                                        fullWidth
                                        value={horario.horaInicio}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            handleHorarioChange(index, event)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <TextField
                                        name="horaFin"
                                        label="Hora de Fin"
                                        variant="outlined"
                                        type="time"
                                        fullWidth
                                        value={horario.horaFin}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            handleHorarioChange(index, event)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
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
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button variant="outlined" color="error" onClick={handleAddHorario}>
                                    Agregar Horario
                                </Button>
                            </Grid>
                        </Grid>
                         <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel
                                    htmlFor="nombre"
                                    shrink
                                    sx={{
                                        transform: 'translateY(-18px)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                    }}>
                                    Nombre del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="nombre"
                                    value={officeData.medico.nombre}
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre del médico.."
                                    inputProps={{ 'aria-label': 'Nombre del Médico' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel
                                    htmlFor="apellido"
                                    shrink
                                    sx={{
                                        transform: 'translateY(-18px)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                    }}>
                                    Apellido del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="apellido"
                                    value={officeData.medico.apellido}
                                    onChange={handleChange}
                                    placeholder="Ingrese el apellido del médico.."
                                    inputProps={{ 'aria-label': 'Apellido del Médico' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel
                                    htmlFor="teléfono"
                                    shrink
                                    sx={{
                                        transform: 'translateY(-18px)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        my: 0.5,
                                    }}>
                                    Teléfono del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="teléfono"
                                    value={officeData.medico.telefono}
                                    onChange={handleChange}
                                    placeholder="Ingrese el teléfono del médico.."
                                    inputProps={{ 'aria-label': 'Teléfono del Médico' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel
                                    htmlFor="email"
                                    shrink
                                    sx={{
                                        transform: 'translateY(-18px)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        my: 0.5,
                                    }}>
                                    Email del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    value={officeData.medico.email}
                                    onChange={handleChange}
                                    placeholder="Ingrese el email del médico.."
                                    inputProps={{ 'aria-label': 'Email del Médico' }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel
                                    htmlFor="dni"
                                    shrink
                                    sx={{
                                        transform: 'translateY(-18px)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        my: 0.5,
                                    }}>
                                    Dni del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="dni"
                                    type="text"
                                    placeholder="Ingrese el DNI del médico.."
                                    value={officeData.medico.dni ?? ''}
                                    onChange={handleChange}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        style: { textAlign: 'left' },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="fechaNacimiento">
                                    Fecha de Nacimiento del Médico
                                </InputLabel>
                                <Input
                                    id="fechaNacimiento"
                                    type="date" // Mantenido como type="date" para mostrar el calendario
                                    value={officeData.medico.fechaNacimiento}
                                    onChange={handleChange}
                                    inputProps={{
                                        min: '1900-01-01', // Opcional: Establecer límite inferior
                                        max: '2050-12-31', // Opcional: Establecer límite superior
                                    }}
                                />
                            </FormControl>
                           
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="cuil"
                                label="CUIL del Médico"
                                variant="outlined"
                                placeholder="Ingrese el cuil del médico.."
                                fullWidth
                                value={officeData.medico.cuil}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="especialidad"
                                label="Especialidad del Médico"
                                variant="outlined"
                                placeholder="Ingrese la especialidad del médico.."
                                fullWidth
                                value={officeData.medico.especialidad}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        bgcolor: '#000',
                                        '&:hover': {
                                            bgcolor: '#fff',
                                            color: '#000',
                                            boxShadow: '1px 0px 1px 3px rgba(0,0,0,0.25)',
                                        },
                                    }}>
                                    Guardar Consultorio
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewOfficeForm;
