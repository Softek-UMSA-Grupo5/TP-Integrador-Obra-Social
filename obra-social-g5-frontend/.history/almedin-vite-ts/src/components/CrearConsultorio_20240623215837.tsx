import React, { useState, ChangeEvent, FormEvent } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
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
        horarioAtencion: [initialHorario],
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleHorarioChange = (
        index: number,
        event: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
        const { name, value } = event.target;
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.map((horario, idx) => {
                if (idx === index) {
                    return {
                        ...horario,
                        [name!]: value, // Aquí se usa 'name!' para asegurar que TypeScript entiende que 'name' es de tipo 'string'
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
            horarioAtencion: [...prevData.horarioAtencion, initialHorario],
        }));
    };

    const handleRemoveHorario = (index: number) => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: prevData.horarioAtencion.filter((_, idx) => idx !== index),
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
            setSelectExistingMedico(false); // Desactivar la selección de médico existente si se elige crear nuevo
        } else if (name === 'selectExistingMedico') {
            setSelectExistingMedico(checked);
            setCreateNewMedico(false); // Desactivar la creación de nuevo médico si se elige médico existente
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
            medico: initialMedico, // Revertir a médico vacío
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
                                        <InputLabel htmlFor="calle" sx={{m: 1}} shrink>
                                            Calle
                                        </InputLabel>
                                        <OutlinedInput
                                            id="calle"
                                            value={officeData.ubicacion.calle}
                                            onChange={handleLocationChange}
                                            placeholder="Ingrese la calle del consultorio.."
                                        />
                                    </FormControl>{/* 
                            <TextField
                                id="calle"
                                label="Calle"
                                variant="outlined"
                                placeholder="Ingrese la calle del consultorio.."
                                fullWidth
                                value={officeData.ubicacion.calle}
                                onChange={handleLocationChange}
                                InputLabelProps={{ shrink: true }}
                            /> */}
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
                        {/* Horarios de atención */}
                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Día de la Semana</InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            onChange={(event) => handleSelectChange(index, event)}
                                            label="Día de la Semana">
                                            <MenuItem value="LUNES">LUNES</MenuItem>
                                            <MenuItem value="MARTES">MARTES</MenuItem>
                                            <MenuItem value="MIERCOLES">MIERCOLES</MenuItem>
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
                        {/* Selección de opción para médico */}
                        <Grid item xs={12}>
                            <p>Seleccione una opción para médico:</p>
                            <FormControl component="fieldset">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={createNewMedico}
                                                onChange={handleCheckboxChange}
                                                name="createNewMedico"
                                                sx={{ borderRadius: '50%' }}
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
                                                sx={{ borderRadius: '50%' }}
                                            />
                                        }
                                        label="Seleccionar Médico Existente"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!createNewMedico && !selectExistingMedico}
                                                onChange={handleNoMedicoSelection}
                                                name="noMedico"
                                                sx={{ borderRadius: '50%' }}
                                            />
                                        }
                                        label="No asociar ningún Médico"
                                        sx={{ ml: 2 }}
                                    />
                                </div>
                            </FormControl>
                        </Grid>

                        {/* Campos para crear un nuevo médico */}
                        {selectExistingMedico && (
                                        <Select
                                            value={selectedMedicoId}
                                            onChange={handleSelectExistingMedicoChange}
                                            fullWidth
                                            variant="outlined"
                                            sx={{ ml: 2 }}>
                                            {existingMedicos.map((medico) => (
                                                <MenuItem key={medico.id} value={medico.id}>
                                                    {`${medico.nombre} ${medico.apellido}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                        {createNewMedico && (
                            <>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="nombre" shrink>
                                            Nombre del Médico
                                        </InputLabel>
                                        <OutlinedInput
                                            id="nombre"
                                            value={officeData.medico.nombre}
                                            onChange={handleChange}
                                            placeholder="Ingrese el nombre del médico"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="apellido" shrink>
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
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="teléfono" shrink>
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
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="email" shrink>
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
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="dni" shrink>
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
                                        <InputLabel htmlFor="fechaNacimiento" shrink>
                                            Fecha de Nacimiento del Médico
                                        </InputLabel>
                                        <TextField
                                            id="fechaNacimiento"
                                            type="date"
                                            value={officeData.medico.fechaNacimiento}
                                            onChange={handleChange}
                                            variant="outlined"
                                            inputProps={{
                                                min: '1900-01-01',
                                                max: '2050-12-31',
                                            }}
                                            InputLabelProps={{ shrink: true }}
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
                            </>
                        )}

                        {/* Botón de Guardar */}
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewOfficeForm;
