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
    TextField,
} from '@mui/material';

interface Horario {
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
}

interface Medico {
    id?: number; // Ahora el ID del médico puede ser opcional ya que inicialmente no existe
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni?: number | string; // Puede ser un número o string antes de ser convertido
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

interface Consultorio {
    horariosDeAtencion: Horario[];
    ubicacion: Ubicacion;
    medico: Medico['id'] | undefined; // Ahora el médico puede ser undefined al inicio
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
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        fechaNacimiento: '',
        cuil: '',
        especialidad: '',
    };

    const [officeData, setOfficeData] = useState<Consultorio>({
        horariosDeAtencion: [initialHorario],
        ubicacion: initialUbicacion,
        medico: undefined,
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
        setOfficeData((prevData) => ({
            ...prevData,
            medico: {
                ...(prevData.medico || {}),
                [id]: value,
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

    const handleCreateNewMedico = async () => {
        try {
            const newMedicoId = await createMedicoAndReturnId(officeData.medico); // Función simulada
            setOfficeData((prevData) => ({
                ...prevData,
                medico: newMedicoId,
            }));
            console.log('Médico creado exitosamente con ID:', newMedicoId);
        } catch (error) {
            console.error('Error al crear el médico:', error);
            alert('No se pudo crear el médico. Por favor, inténtelo nuevamente.');
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        let medicoIdToSend = officeData.medico?.id; // Guardamos el ID del médico seleccionado
        if (createNewMedico) {
            await handleCreateNewMedico(); // Crear nuevo médico si está activo
            medicoIdToSend = officeData.medico?.id; // Actualizamos el ID del médico después de crearlo
        }
        const dataToSend = {
            ...officeData,
            medico: medicoIdToSend,
        };
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
                medico: {
                    ...selectedMedico,
                    dni: selectedMedico.dni ? selectedMedico.dni.toString() : '',
                },
            }));
        }
    };

    const handleNoMedicoSelection = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            medico: undefined,
        }));
    };
    return (
        <Card>
            <CardHeader title="Agregar Nuevo Consultorio" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="medico-nombre">Nombre del Médico</InputLabel>
                                <OutlinedInput
                                    id="medico-nombre"
                                    value={officeData.medico?.nombre || ''}
                                    onChange={handleMedicoChange}
                                    label="Nombre del Médico"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        {selectExistingMedico && (
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="medico-select-label">
                                        Seleccione un Médico
                                    </InputLabel>
                                    <Select
                                        labelId="medico-select-label"
                                        id="medico-select"
                                        value={selectedMedicoId}
                                        onChange={handleSelectExistingMedicoChange}
                                        label="Seleccione un Médico">
                                        {existingMedicos.map((medico) => (
                                            <MenuItem key={medico.id} value={medico.id.toString()}>
                                                {medico.nombre} {medico.apellido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddHorario}
                                style={{ marginRight: '10px' }}>
                                Agregar Horario
                            </Button>
                            {officeData.horariosDeAtencion.map((horario, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`diaSemana-${index}`}>
                                                    Día de la semana
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`diaSemana-${index}`}
                                                    name="diaSemana"
                                                    value={horario.diaSemana}
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Día de la semana"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`horaInicio-${index}`}>
                                                    Hora de Inicio
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`horaInicio-${index}`}
                                                    name="horaInicio"
                                                    value={horario.horaInicio}
                                                    type="time"
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Hora de Inicio"
                                                    inputProps={{
                                                        step: 300, // 5 minutes
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor={`horaFin-${index}`}>
                                                    Hora de Fin
                                                </InputLabel>
                                                <OutlinedInput
                                                    id={`horaFin-${index}`}
                                                    name="horaFin"
                                                    value={horario.horaFin}
                                                    type="time"
                                                    onChange={(e) => handleHorarioChange(index, e)}
                                                    label="Hora de Fin"
                                                    inputProps={{
                                                        step: 300, // 5 minutes
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton onClick={() => handleRemoveHorario(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-calle">Calle</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    label="Calle"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-ciudad">Ciudad</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    label="Ciudad"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-provincia">Provincia</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    label="Provincia"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="ubicacion-altura">Altura</InputLabel>
                                <OutlinedInput
                                    id="ubicacion-altura"
                                    type="number"
                                    value={officeData.ubicacion.altura ?? ''}
                                    onChange={handleLocationChange}
                                    label="Altura"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
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
