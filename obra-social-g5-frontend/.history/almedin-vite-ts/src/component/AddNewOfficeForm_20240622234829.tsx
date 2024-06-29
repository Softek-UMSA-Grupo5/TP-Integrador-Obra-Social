import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import OfficeData from '../models/Office';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import CustomTextField from './CustomTextField'; // Asegúrate de importar el nuevo componente

const AddNewOfficeForm: React.FC = () => {
    const initialHorario = {
        diaSemana: '',
        horaInicio: '',
        horaFin: '',
    };

    const [officeData, setOfficeData] = useState<OfficeData>({
        horarioAtencion: [initialHorario],
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: undefined,
        },
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const onlyNums = value.replace(/[^0-9]/g, '');

        const newValue = onlyNums === '' ? undefined : parseInt(onlyNums, 10);
        setOfficeData((prevData) => ({
            ...prevData,
            medico: {
                ...prevData.medico,
                [id]: newValue,
            },
        }));
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const onlyNums = value.replace(/[^0-9]/g, '');

        setOfficeData((prevData) => ({
            ...prevData,
            ubicacion: {
                ...prevData.ubicacion,
                [id]: onlyNums === '' ? undefined : parseInt(onlyNums, 10),
            },
        }));
    };

    const handleHorarioChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = event.target;
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => {
                if (idx === index) {
                    return {
                        ...horario,
                        [name!]: value,
                    };
                }
                return horario;
            }),
        }));
    };

    const handleSelectChange = (index: number, event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => {
                if (idx === index) {
                    return {
                        ...horario,
                        [name!]: value,
                    };
                }
                return horario;
            }),
        }));
    };

    const handleAddHorario = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: [...prevData.horarioAtencion, initialHorario],
        }));
    };

    const handleRemoveHorario = (index: number) => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataToSend = {
            ...officeData,
            medico: {
                ...officeData.medico,
                dni:
                    typeof officeData.medico.dni === 'string'
                        ? parseInt(officeData.medico.dni)
                        : officeData.medico.dni,
            },
        };
        try {
            console.log('Data a enviar:', dataToSend);
            //await saveOffice(dataToSend);
            alert('Office saved successfully!');
        } catch (error) {
            console.error('Error saving office:', error);
            alert('Failed to save office. Please try again.');
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 70 }}>
            <CardHeader title="Agregar nuevo Consultorio" sx={{ textAlign: 'center' }} />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="nombre"
                                label="Nombre del Médico"
                                variant="outlined"
                                placeholder="Ingrese el nombre del médico.."
                                fullWidth
                                value={officeData.medico.nombre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="apellido"
                                label="Apellido del Médico"
                                variant="outlined"
                                placeholder="Ingrese el apellido del médico.."
                                fullWidth
                                value={officeData.medico.apellido}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="telefono"
                                label="Teléfono del Médico"
                                variant="outlined"
                                placeholder="Ingrese número de teléfono.."
                                fullWidth
                                value={officeData.medico.telefono}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="email"
                                label="Email del Médico"
                                variant="outlined"
                                placeholder="Ingrese el email del médico.."
                                fullWidth
                                value={officeData.medico.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="dni"
                                label="DNI del Médico"
                                variant="outlined"
                                placeholder="Ingrese el DNI del médico"
                                fullWidth
                                type="text"
                                value={officeData.medico.dni ?? ''}
                                onChange={handleChange}
                                InputProps={{
                                    inputMode: 'numeric',
                                    style: { textAlign: 'left' },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="fechaNacimiento"
                                label="Fecha de Nacimiento del Médico"
                                variant="outlined"
                                type="date"
                                fullWidth
                                value={officeData.medico.fechaNacimiento}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="cuil"
                                label="CUIL del Médico"
                                variant="outlined"
                                placeholder="Ingrese el CUIL del médico.."
                                fullWidth
                                value={officeData.medico.cuil}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="especialidad"
                                label="Especialidad del Médico"
                                variant="outlined"
                                placeholder="Ingrese la especialidad del médico.."
                                fullWidth
                                value={officeData.medico.especialidad}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="ciudad"
                                label="Ciudad"
                                variant="outlined"
                                fullWidth
                                value={officeData.ubicacion.ciudad}
                                onChange={handleLocationChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="provincia"
                                label="Provincia"
                                variant="outlined"
                                fullWidth
                                value={officeData.ubicacion.provincia}
                                onChange={handleLocationChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="calle"
                                label="Calle"
                                variant="outlined"
                                fullWidth
                                value={officeData.ubicacion.calle}
                                onChange={handleLocationChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="altura"
                                label="Altura"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={officeData.ubicacion.altura !== undefined ? officeData.ubicacion.altura.toString() : ''}
                                onChange={handleLocationChange}
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
                        {officeData.horarioAtencion.map((horario, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id={`diaSemana-label-${index}`}>Día</InputLabel>
                                        <Select
                                            labelId={`diaSemana-label-${index}`}
                                            id={`diaSemana-${index}`}
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            onChange={(e) => handleSelectChange(index, e)}
                                            label="Día"
                                        >
                                            <MenuItem value="Lunes">Lunes</MenuItem>
                                            <MenuItem value="Martes">Martes</MenuItem>
                                            <MenuItem value="Miércoles">Miércoles</MenuItem>
                                            <MenuItem value="Jueves">Jueves</MenuItem>
                                            <MenuItem value="Viernes">Viernes</MenuItem>
                                            <MenuItem value="Sábado">Sábado</MenuItem>
                                            <MenuItem value="Domingo">Domingo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        id={`horaInicio-${index}`}
                                        name="horaInicio"
                                        label="Hora Inicio"
                                        type="time"
                                        fullWidth
                                        value={horario.horaInicio}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => handleHorarioChange(index, e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextField
                                        id={`horaFin-${index}`}
                                        name="horaFin"
                                        label="Hora Fin"
                                        type="time"
                                        fullWidth
                                        value={horario.horaFin}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => handleHorarioChange(index, e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleRemoveHorario(index)}
                                        disabled={officeData.horarioAtencion.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button variant="outlined" color="primary" onClick={handleAddHorario}>
                                Agregar Horario
                            </Button>
                        </Grid>
                    </Grid>
                    <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Guardar
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewOfficeForm;
