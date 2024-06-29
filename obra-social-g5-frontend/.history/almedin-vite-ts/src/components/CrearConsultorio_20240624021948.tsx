import React, { useState, ChangeEvent, FormEvent } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import { createConsultorio } from '../api/ConsultorioApi'; // Ajusta la ruta según tu estructura
import { createMedicoAndAssociateToConsultorio } from '../api/MedicoApi';
import { ConsultorioCreateRequest } from '../types/Horario';
import { MedicoRequest } from '../types/Medico';

const AddNewOfficeForm: React.FC = () => {
  const [consultorio, setConsultorio] = useState<ConsultorioCreateRequest>({
    horarioAtencion: [{
      diaSemana: 'LUNES',
      horaInicio: '13:45:30.123456789',
      horaFin: '13:45:30.123456789',
      codigo: 'string'
    }],
    ubicacion: {
      id: 0,
      ciudad: 'F',
      provincia: '^',
      calle: 'f',
      altura: 0,
      codigo: 'string'
    },
    medicoId: 0
  });

  const [medico, setMedico] = useState<MedicoRequest>({
    nombre: 'string',
    apellido: 'string',
    telefono: 'string',
    email: 'string',
    dni: 0,
    fechaNacimiento: '2022-03-10',
    cuil: 'string',
    especialidad: 'string',
    consultoriosId: [0]
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 1. Crear el consultorio
      const newConsultorio = await createConsultorio(consultorio);
      console.log('Consultorio creado exitosamente:', newConsultorio);

      // 2. Crear el médico y asociarlo al consultorio
      const newMedico = await createMedicoAndAssociateToConsultorio(medico, newConsultorio.id);
      console.log('Médico creado y asociado al consultorio exitosamente:', newMedico);

      alert('Consultorio y médico creados exitosamente!');
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('No se pudo completar la operación. Por favor, inténtelo nuevamente.');
    }
  };

  const handleConsultorioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setConsultorio((prevConsultorio) => ({
      ...prevConsultorio,
      [id]: value,
    }));
  };

  const handleMedicoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setMedico((prevMedico) => ({
      ...prevMedico,
      [id]: value,
    }));
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
