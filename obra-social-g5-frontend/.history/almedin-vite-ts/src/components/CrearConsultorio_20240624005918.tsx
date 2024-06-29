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
    Select,
    SelectChangeEvent,
} from '@mui/material';

interface Horario {
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
}

interface Medico {
    id: number | undefined; // Agregamos el campo 'id' para identificar al médico seleccionado
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni?: number;
    fechaNacimiento: string;
    cuil: string;
    especialidad: string;
}

interface Ubicacion {
    ciudad: string;
    provincia: string;
    calle: string;
    altura?: number;
}

const AddNewOfficeForm = () => {
    const initialHorario: Horario = {
        diaSemana: '',
        horaInicio: '',
        horaFin: '',
    };

    const initialUbicacion: Ubicacion = {
        ciudad: '',
        provincia: '',
        calle: '',
        altura: undefined,
    };

    const initialMedico: Medico = {
        id: undefined, // Campo 'id' inicializado como vacío
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: undefined,
        fechaNacimiento: '',
        cuil: '',
        especialidad: '',
    };

    const [officeData, setOfficeData] = useState({
        horariosDeAtencion: [initialHorario],
        ubicacion: initialUbicacion,
        medico: initialMedico,
    });

    const [createNewMedico, setCreateNewMedico] = useState(false);
    const [selectExistingMedico, setSelectExistingMedico] = useState(false);
    const [existingMedicos] = useState<Medico[]>([
        {
            id: 2,
            nombre: 'Luciano',
            apellido: 'Malleret',
            telefono: '3456545581',
            email: 'lucianomalleret8@gmail.com',
            dni: 41907546,
            cuil: '23419075469',
            fechaNacimiento: '1999-05-16',
            especialidad: 'Odontólogo',
        },
        {
            id: 3,
            nombre: 'Pablo',
            apellido: 'Moya',
            telefono: '3454050829',
            email: 'pablomoya@gmail.com',
            dni: 40562846,
            cuil: '23405628469',
            fechaNacimiento: '1998-02-04',
            especialidad: 'Oculista',
        },
        {
            id: 4,
            nombre: 'Ignacio',
            apellido: 'Lower',
            telefono: '3454123589',
            email: 'ignacioL@gmail.com',
            dni: 41381776,
            cuil: '23413817769',
            fechaNacimiento: '1998-04-24',
            especialidad: 'Oftalmologo',
        },
    ]);
    const [selectedMedicoId, setSelectedMedicoId] = useState('');

    const handleMedicoChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const handleHorarioChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => {
                if (idx === index) {
                    return {
                        ...horario,
                        [name]: value,
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
            horariosDeAtencion: prevData.horariosDeAtencion.map((horario, idx) => {
                if (idx === index) {
                    return {
                        ...horario,
                        [name]: value,
                    };
                }
                return horario;
            }),
        }));
    };

    const handleAddHorario = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            horariosDeAtencion: [...prevData.horariosDeAtencion, initialHorario],
        }));
    };

    const handleRemoveHorario = (index: number) => {
        setOfficeData((prevData) => ({
            ...prevData,
            horariosDeAtencion: prevData.horariosDeAtencion.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
            alert('Consultorio guardado exitosamente!');
        } catch (error) {
            console.error('Error al guardar el consultorio:', error);
            alert('No se pudo guardar el consultorio. Por favor, inténtelo nuevamente.');
        }
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (name === 'createNewMedico') {
            setCreateNewMedico(checked);
            setSelectExistingMedico(false);
        } else if (name === 'selectExistingMedico') {
            setSelectExistingMedico(checked);
            setCreateNewMedico(false);
        }
    };

    const handleSelectExistingMedicoChange = (event: SelectChangeEvent<string>) => {
        setSelectedMedicoId(event.target.value);
        const selectedMedico = existingMedicos.find(
            (medico) => medico.id === parseInt(event.target.value)
        );
        if (selectedMedico) {
            setOfficeData((prevData) => ({
                ...prevData,
                medico: selectedMedico,
            }));
        }
    };

    const handleNoMedicoSelection = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            medico: initialMedico,
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
                        {/* Datos de ubicación del consultorio */}
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="calle"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Calle
                                </InputLabel>
                                <OutlinedInput
                                    id="calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la calle del consultorio.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="altura"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Altura
                                </InputLabel>
                                <OutlinedInput
                                    id="altura"
                                    value={
                                        officeData.ubicacion.altura !== undefined
                                            ? officeData.ubicacion.altura.toString()
                                            : ''
                                    }
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la altura del consultorio.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        style: {
                                            MozAppearance: 'textfield',
                                            appearance: 'textfield',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="ciudad"
                                    sx={{ my: -0.5, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Ciudad
                                </InputLabel>
                                <OutlinedInput
                                    id="ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la ciudad del consultorio.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="provincia"
                                    sx={{ my: -0.5, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Provincia
                                </InputLabel>
                                <OutlinedInput
                                    id="provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    placeholder="Ingrese la provincia del consultorio.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        {/* Horarios de atención */}
                        {officeData.horariosDeAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            htmlFor={`diaSemana-${index}`}
                                            sx={{ my: -0.5, fontSize: 16, fontWeight: 'bold' }}
                                            shrink>
                                            Día de la Semana
                                        </InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            sx={{ my: 1, maxHeight: 40 }}
                                            onChange={(event) => handleSelectChange(index, event)}>
                                            <MenuItem value="LUNES">LUNES</MenuItem>
                                            <MenuItem value="MARTES">MARTES</MenuItem>
                                            <MenuItem value="MIERCOLES">MIERCOLES</MenuItem>
                                            <MenuItem value="JUEVES">JUEVES</MenuItem>
                                            <MenuItem value="VIERNES">VIERNES</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            htmlFor={`horaInicio-${index}`}
                                            sx={{ my: -0.5, fontSize: 16, fontWeight: 'bold' }}
                                            shrink>
                                            Hora de Inicio
                                        </InputLabel>
                                        <OutlinedInput
                                            id={`horaInicio-${index}`}
                                            name="horaInicio"
                                            value={horario.horaInicio}
                                            type="time"
                                            onChange={(event) => handleHorarioChange(index, event)}
                                            sx={{ my: 1, maxHeight: 40 }}
                                            label="Hora de Inicio"
                                            inputProps={{
                                                step: 300, // 5 minutes
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            htmlFor={`horaFin-${index}`}
                                            sx={{ my: -0.5, fontSize: 16, fontWeight: 'bold' }}
                                            shrink>
                                            Hora de Fin
                                        </InputLabel>
                                        <OutlinedInput
                                            id={`horaFin-${index}`}
                                            name="horaFin"
                                            value={horario.horaFin}
                                            type="time"
                                            onChange={(event) => handleHorarioChange(index, event)}
                                            sx={{ my: 1, maxHeight: 40 }}
                                            label="Hora de Fin"
                                            inputProps={{
                                                step: 300, // 5 minutes
                                            }}
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
                        <Grid item xs={12} my={2}>
                            <Button
                                variant="outlined"
                                onClick={handleAddHorario}
                                sx={{ textTransform: 'none' }}>
                                Agregar Horario de Atención
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Sección de médico */}
                    <Grid container spacing={2} mt={3}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="nombre"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Nombre del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="nombre"
                                    name="nombre"
                                    value={officeData.medico.nombre}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el nombre del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="apellido"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Apellido del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="apellido"
                                    name="apellido"
                                    value={officeData.medico.apellido}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el apellido del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="telefono"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Teléfono del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="telefono"
                                    name="telefono"
                                    value={officeData.medico.telefono}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el teléfono del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="email"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Email del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    name="email"
                                    value={officeData.medico.email}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el email del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="dni"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    DNI del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="dni"
                                    name="dni"
                                    value={officeData.medico.dni ?? ''}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el DNI del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        style: {
                                            MozAppearance: 'textfield',
                                            appearance: 'textfield',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="cuil"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    CUIL del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="cuil"
                                    name="cuil"
                                    value={officeData.medico.cuil}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese el CUIL del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        style: {
                                            MozAppearance: 'textfield',
                                            appearance: 'textfield',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="fechaNacimiento"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Fecha de Nacimiento del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={officeData.medico.fechaNacimiento}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese la fecha de nacimiento del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                    type="date"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    htmlFor="especialidad"
                                    sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                    shrink>
                                    Especialidad del Médico
                                </InputLabel>
                                <OutlinedInput
                                    id="especialidad"
                                    name="especialidad"
                                    value={officeData.medico.especialidad}
                                    onChange={handleMedicoChange}
                                    placeholder="Ingrese la especialidad del médico.."
                                    sx={{ my: 1, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Selección de Médico */}
                    <Grid container spacing={2} mt={3}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <legend>Médico Asignado</legend>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={createNewMedico}
                                            onChange={handleCheckboxChange}
                                            name="createNewMedico"
                                        />
                                    }
                                    label="Crear Nuevo Médico"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectExistingMedico}
                                            onChange={handleCheckboxChange}
                                            name="selectExistingMedico"
                                        />
                                    }
                                    label="Seleccionar Médico Existente"
                                />
                                {selectExistingMedico && (
                                    <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                                        <InputLabel
                                            htmlFor="selectMedico"
                                            sx={{ my: -1, fontSize: 16, fontWeight: 'bold' }}
                                            shrink>
                                            Médico Existente
                                        </InputLabel>
                                        <Select
                                            id="selectMedico"
                                            value={selectedMedicoId}
                                            onChange={handleSelectExistingMedicoChange}
                                            label="Médico Existente"
                                            sx={{ my: 1, maxHeight: 40 }}>
                                            {existingMedicos.map((medico) => (
                                                <MenuItem
                                                    key={medico.id}
                                                    value={medico.id.toString()}>
                                                    {`${medico.nombre} ${medico.apellido}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Botón de Submit */}
                    <Grid container justifyContent="flex-end" mt={3}>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">
                                Guardar Consultorio
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewOfficeForm;
