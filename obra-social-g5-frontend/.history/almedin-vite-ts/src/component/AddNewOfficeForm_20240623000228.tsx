import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddNewOfficeForm = () => {
    const initialHorario = {
        diaSemana: '',
        horaInicio: '',
        horaFin: '',
    };

    const [officeData, setOfficeData] = useState({
        horarioAtencion: [initialHorario],
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: '',
        },
        medico: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            dni: '',
            fechaNacimiento: '',
            cuil: '',
            especialidad: '',
        },
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setOfficeData(prevData => ({
            ...prevData,
            medico: {
                ...prevData.medico,
                [id]: value
            },
        }));
    };

    const handleLocationChange = (event) => {
        const { id, value } = event.target;
        setOfficeData(prevData => ({
            ...prevData,
            ubicacion: {
                ...prevData.ubicacion,
                [id]: value
            },
        }));
    };

    const handleHorarioChange = (index, event) => {
        const { name, value } = event.target;
        setOfficeData(prevData => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => (
                idx === index ? { ...horario, [name]: value } : horario
            )),
        }));
    };

    const handleSelectChange = (index, event) => {
        const { name, value } = event.target;
        setOfficeData(prevData => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => (
                idx === index ? { ...horario, [name]: value } : horario
            )),
        }));
    };

    const handleAddHorario = () => {
        setOfficeData(prevData => ({
            ...prevData,
            horarioAtencion: [...prevData.horarioAtencion, initialHorario],
        }));
    };

    const handleRemoveHorario = (index) => {
        setOfficeData(prevData => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Data to send:', officeData);
        // Aquí puedes enviar los datos o realizar cualquier otra acción
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardHeader title="Agregar Nuevo Consultorio" sx={{ textAlign: 'center' }} />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="nombre"
                                label="Nombre del Médico"
                                variant="outlined"
                                placeholder="Ingrese el nombre del médico"
                                fullWidth
                                value={officeData.medico.nombre}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="apellido"
                                label="Apellido del Médico"
                                variant="outlined"
                                placeholder="Ingrese el apellido del médico"
                                fullWidth
                                value={officeData.medico.apellido}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="telefono"
                                label="Teléfono del Médico"
                                variant="outlined"
                                placeholder="Ingrese número de teléfono"
                                fullWidth
                                value={officeData.medico.telefono}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="email"
                                label="Email del Médico"
                                variant="outlined"
                                placeholder="Ingrese el email del médico"
                                fullWidth
                                value={officeData.medico.email}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="dni"
                                label="DNI del Médico"
                                variant="outlined"
                                placeholder="Ingrese el DNI del médico"
                                fullWidth
                                value={officeData.medico.dni}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="fechaNacimiento"
                                label="Fecha de Nacimiento del Médico"
                                variant="outlined"
                                type="date"
                                fullWidth
                                value={officeData.medico.fechaNacimiento}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="cuil"
                                label="CUIL del Médico"
                                variant="outlined"
                                placeholder="Ingrese el CUIL del médico"
                                fullWidth
                                value={officeData.medico.cuil}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="especialidad"
                                label="Especialidad del Médico"
                                variant="outlined"
                                placeholder="Ingrese la especialidad del médico"
                                fullWidth
                                value={officeData.medico.especialidad}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="calle"
                                label="Calle"
                                variant="outlined"
                                placeholder="Ingrese la calle del consultorio"
                                fullWidth
                                value={officeData.ubicacion.calle}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="altura"
                                label="Altura"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={officeData.ubicacion.altura}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    sx: {
                                        height: 'auto',
                                        padding: '10px 14px',
                                        '&::before': {
                                            borderBottom: 'none'
                                        },
                                        '&::after': {
                                            borderBottom: 'none'
                                        }
                                    }
                                }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="ciudad"
                                label="Ciudad"
                                variant="outlined"
                                placeholder="Ingrese la ciudad del consultorio"
                                fullWidth
                                value={officeData.ubicacion.ciudad}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="provincia"
                                label="Provincia"
                                variant="outlined"
                                placeholder="Ingrese la provincia del consultorio"
                                fullWidth
                                value={officeData.ubicacion.provincia}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginBottom: 1 }} // Añade margen inferior
                            />
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 1 }}>
                                        <InputLabel>Día de la Semana</InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            onChange={(event) => handleSelectChange(index, event)}
                                            label="Día de la Semana"
                                            sx={{ marginTop: 1 }}
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
                                        onChange={(event) => handleHorarioChange(index, event)}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ marginBottom: 1 }} // Añade margen inferior
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
                                        onChange={(event) => handleHorarioChange(index, event)}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ marginBottom: 1 }} // Añade margen inferior
                                    />
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveHorario(index)}
                                        sx={{ marginTop: 3 }} // Añade margen superior
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddHorario}
                                >
                                    Agregar Horario
                                </Button>
                            </Grid>
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
                                        },
                                    }}
                                >
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
