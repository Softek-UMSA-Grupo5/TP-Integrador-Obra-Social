import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    Input,
    TextField,
    Grid,
    IconButton,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddNewOfficeForm: React.FC = () => {
    const initialHorario = {
        diaSemana: '',
        horaInicio: '',
        horaFin: '',
    };

    const [officeData, setOfficeData] = useState({
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
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: undefined,
        },
        horarioAtencion: [initialHorario],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;

        if (id === 'dni' || id === 'altura') {
            // Para campos numéricos (DNI, altura)
            const onlyNums = value.replace(/[^0-9]/g, '');
            const newValue = onlyNums === '' ? undefined : parseInt(onlyNums, 10);

            setOfficeData((prevData) => ({
                ...prevData,
                medico: {
                    ...prevData.medico,
                    [id]: newValue,
                },
            }));
        } else if (id === 'fechaNacimiento') {
            // Para campo de fecha de nacimiento
            setOfficeData((prevData) => ({
                ...prevData,
                medico: {
                    ...prevData.medico,
                    [id]: value,
                },
            }));
        } else {
            // Para otros campos de texto (nombre, apellido, etc.)
            setOfficeData((prevData) => ({
                ...prevData,
                medico: {
                    ...prevData.medico,
                    [id]: value,
                },
            }));
        }
    };

    // Función para agregar un nuevo horario de atención
    const handleAddHorario = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: [...prevData.horarioAtencion, initialHorario],
        }));
    };

    // Función para eliminar un horario de atención
    const handleRemoveHorario = (index: number) => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.filter((_, idx) => idx !== index),
        }));
    };

    return (
        <FormControl fullWidth variant="outlined">
            {/* Campos de información del médico */}
            <InputLabel htmlFor="nombre">Nombre del Médico</InputLabel>
            <Input
                id="nombre"
                type="text"
                placeholder="Ingrese el nombre del médico.."
                fullWidth
                value={officeData.medico.nombre}
                onChange={handleChange}
            />

            <InputLabel htmlFor="apellido">Apellido del Médico</InputLabel>
            <Input
                id="apellido"
                type="text"
                placeholder="Ingrese el apellido del médico.."
                fullWidth
                value={officeData.medico.apellido}
                onChange={handleChange}
            />

            <InputLabel htmlFor="telefono">Teléfono del Médico</InputLabel>
            <Input
                id="telefono"
                type="text"
                placeholder="Ingrese número de teléfono.."
                fullWidth
                value={officeData.medico.telefono}
                onChange={handleChange}
            />

            <InputLabel htmlFor="email">Email del Médico</InputLabel>
            <Input
                id="email"
                type="text"
                placeholder="Ingrese el email del médico.."
                fullWidth
                value={officeData.medico.email}
                onChange={handleChange}
            />

            <InputLabel htmlFor="dni">DNI del Médico</InputLabel>
            <Input
                id="dni"
                type="text"
                placeholder="Ingrese el DNI del médico.."
                fullWidth
                value={officeData.medico.dni ?? ''}
                onChange={handleChange}
                inputProps={{
                    inputMode: 'numeric',
                    style: { textAlign: 'left' },
                }}
            />

            <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento del Médico</InputLabel>
            <Input
                id="fechaNacimiento"
                type="date"
                fullWidth
                value={officeData.medico.fechaNacimiento}
                onChange={handleChange}
            />

            <InputLabel htmlFor="cuil">CUIL del Médico</InputLabel>
            <Input
                id="cuil"
                type="text"
                placeholder="Ingrese el cuil del médico.."
                fullWidth
                value={officeData.medico.cuil}
                onChange={handleChange}
            />

            <InputLabel htmlFor="especialidad">Especialidad del Médico</InputLabel>
            <Input
                id="especialidad"
                type="text"
                placeholder="Ingrese la especialidad del médico.."
                fullWidth
                value={officeData.medico.especialidad}
                onChange={handleChange}
            />

            {/* Campos de ubicación */}
            <InputLabel htmlFor="calle">Calle</InputLabel>
            <Input
                id="calle"
                type="text"
                placeholder="Ingrese la calle del consultorio.."
                fullWidth
                value={officeData.ubicacion.calle}
                onChange={handleChange}
            />

            <InputLabel htmlFor="altura">Altura</InputLabel>
            <Input
                id="altura"
                type="number"
                placeholder="Ingrese la altura del consultorio.."
                fullWidth
                value={officeData.ubicacion.altura ?? ''}
                onChange={handleChange}
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    style: {
                        MozAppearance: 'textfield',
                        appearance: 'textfield',
                    },
                }}
            />

            <InputLabel htmlFor="ciudad">Ciudad</InputLabel>
            <Input
                id="ciudad"
                type="text"
                placeholder="Ingrese la ciudad del consultorio.."
                fullWidth
                value={officeData.ubicacion.ciudad}
                onChange={handleChange}
            />

            <InputLabel htmlFor="provincia">Provincia</InputLabel>
            <Input
                id="provincia"
                type="text"
                placeholder="Ingrese la provincia del consultorio.."
                fullWidth
                value={officeData.ubicacion.provincia}
                onChange={handleChange}
            />

            {/* Campos de horarios de atención */}
            {officeData.horarioAtencion.map((horario, index) => (
                <Grid container spacing={2} key={index} my={2} ml={3}>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Día de la Semana</InputLabel>
                            <Select
                                name="diaSemana"
                                value={horario.diaSemana}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                                    handleChange({
                                        target: {
                                            id: 'diaSemana',
                                            value: event.target.value,
                                        } as React.ChangeEvent<HTMLInputElement>,
                                    })
                                }
                                label="Día de la Semana"
                            >
                                <MenuItem value="LUNES">LUNES</MenuItem>
                                <MenuItem value="MARTES">MARTES</MenuItem>
                                <MenuItem value="MIÉRCOLES">MIÉRCOLES</MenuItem>
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
                                handleChange({
                                    target: {
                                        id: 'horaInicio',
                                        value: event.target.value,
                                    } as React.ChangeEvent<HTMLInputElement>,
                                })
                            }
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
                                handleChange({
                                    target: {
                                        id: 'horaFin',
                                        value: event.target.value,
                                    } as React.ChangeEvent<HTMLInputElement>,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={2.5}>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => handleRemoveHorario(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </FormControl>
    );
};

export default AddNewOfficeForm;
