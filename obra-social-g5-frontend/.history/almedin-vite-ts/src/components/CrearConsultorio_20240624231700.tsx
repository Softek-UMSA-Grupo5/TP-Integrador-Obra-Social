import React, { useState, useEffect } from 'react';
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
    FormControlLabel,
    Checkbox,
    SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addMedico, getAll } from '../api/MedicoApi';
import { createConsultorio } from '../api/ConsultorioApi';
import { MedicoRequestDto, MedicoResponseDto } from '../types/Medico';
import { ConsultorioResponseDto } from '../types/Horario';

interface ConsultorioCreateRequest {
    id?: number;
    horarioAtencion: { diaSemana: string; horaInicio: string; horaFin: string }[];
    ubicacion: {
        ciudad: string;
        provincia: string;
        calle: string;
        altura: number;
    };
    medicoId?: number;
}

interface LocalTime {
    hour: number;
    minute: number;
    second: number;
}

const ConsultorioForm: React.FC = () => {
    const initialLocalTime: LocalTime = {
        hour: 0,
        minute: 0,
        second: 0,
    };

    const [horario, setHorario] = useState({
        horaInicio: initialLocalTime,
        horaFin: initialLocalTime,
    });

    const [officeData, setOfficeData] = useState<ConsultorioCreateRequest>({
        id: undefined,
        horarioAtencion: [{ diaSemana: '', horaInicio: '', horaFin: '' }],
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: 0,
        },
    });

    const [medicoData, setMedicoData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        fechaNacimiento: '',
        cuil: '',
        especialidad: '',
        consultoriosId: [],
    });

    const [existingMedicos, setExistingMedicos] = useState<MedicoResponseDto[]>([]);
    const [createNewMedico, setCreateNewMedico] = useState(false);
    const [selectExistingMedico, setSelectExistingMedico] = useState(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const medicos = await getAll(); // Asumiendo que tienes una función getAll para obtener médicos
                setExistingMedicos(medicos);
            } catch (error) {
                console.error('Error fetching medicos:', error);
            }
        };

        fetchMedicos();
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (name === 'createNewMedico') {
            setCreateNewMedico(checked);
            if (checked) setSelectExistingMedico(false);
        } else if (name === 'selectExistingMedico') {
            setSelectExistingMedico(checked);
            if (checked) setCreateNewMedico(false);
        }
    };

    const handleSelectExistingMedicoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedMedicoId(event.target.value as number);
    };

    const handleNoMedicoSelection = () => {
        setCreateNewMedico(false);
        setSelectExistingMedico(false);
        setSelectedMedicoId(undefined);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const consultorioResponse: ConsultorioResponseDto = await createConsultorio(officeData); // Asumiendo que tienes una función createConsultorio para crear consultorios
            const consultorioId = consultorioResponse.id;

            if (createNewMedico) {
                const medicoToCreate: MedicoRequestDto = {
                    nombre: medicoData.nombre,
                    apellido: medicoData.apellido,
                    telefono: medicoData.telefono,
                    email: medicoData.email,
                    dni: parseInt(medicoData.dni, 10),
                    fechaNacimiento: medicoData.fechaNacimiento,
                    cuil: medicoData.cuil,
                    especialidad: medicoData.especialidad,
                    consultoriosId: [consultorioId],
                };

                await addMedico([medicoToCreate]); // Asumiendo que tienes una función addMedico para agregar médicos

                console.log('Consultorio y médico creados correctamente.');
            } else {
                console.log('Consultorio creado correctamente.');
            }
        } catch (error) {
            console.error('Error al crear el consultorio y/o médico:', error);
            alert('Error al crear el consultorio y/o médico. Por favor, inténtelo nuevamente.');
        }
    };

    const handleMedicoDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMedicoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Validar que el valor no esté vacío y solo contenga números
        if (value === '' || /^\d*$/.test(value)) {
            setOfficeData((prevData) => ({
                ...prevData,
                ubicacion: {
                    ...prevData.ubicacion,
                    [name]: value === '' ? '' : parseInt(value, 10),
                },
            }));
        }
    };

    const handleHorarioChange = (name: 'horaInicio' | 'horaFin', value: string) => {
        const formattedTime = formatTimeInput(value);

        setHorario((prevHorario) => ({
            ...prevHorario,
            [name]: formattedTime,
        }));
    };

    const handleSelectChange = (index: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = event.target;
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index ? { ...horario, diaSemana: value as string } : horario
        );
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    };

    const handleRemoveHorario = (index: number) => {
        const updatedHorarioAtencion = officeData.horarioAtencion.filter((_, i) => i !== index);
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    };

    const handleAddHorario = () => {
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: [
                ...prevData.horarioAtencion,
                { diaSemana: '', horaInicio: '', horaFin: '' },
            ],
        }));
    };

    const getFormattedDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTimeInput = (value: string): LocalTime | null => {
        const cleanedValue = value.replace(/[^\d:]/g, '');
        const parts = cleanedValue.split(':');

        const hours = parts[0] ? parseInt(parts[0], 10) : 0;
        const minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;
        const seconds = parts.length > 2 ? parseInt(parts[2], 10) : 0;

        return { hour: hours, minute: minutes, second: seconds };
    };

    return (
        <div>
            <input
                type="time"
                value={horario.horaInicio ? `${horario.horaInicio.hour}:${horario.horaInicio.minute}:${horario.horaInicio.second}` : ''}
                onChange={(e) => handleHorarioChange('horaInicio', e.target.value)}
            />
            <input
                type="time"
                value={horario.horaFin ? `${horario.horaFin.hour}:${horario.horaFin.minute}:${horario.horaFin.second}` : ''}
                onChange={(e) => handleHorarioChange('horaFin', e.target.value)}
            />
        </div>
    );

    /* const addSecondsToTime = (time: string): string => {
        const parts = time.split(':');
        const hours = parts.length > 0 ? parts[0] : '00';
        const minutes = parts.length > 1 ? parts[1] : '00';

        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    }; */

    return (
        <Card sx={{ maxWidth: 700, mx: 90, my: 5 }}>
            <CardHeader
                title="Crear Consultorio"
                subheader="Información requerida para crear un nuevo consultorio"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Calle
                                </InputLabel>
                                <OutlinedInput
                                    name="calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    placeholder="Ingrese la calle del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Altura
                                </InputLabel>
                                <OutlinedInput
                                    name="altura"
                                    type="text"
                                    value={
                                        officeData.ubicacion.altura !== undefined &&
                                        officeData.ubicacion.altura !== 0
                                            ? officeData.ubicacion.altura.toString()
                                            : ''
                                    }
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    placeholder="Ingrese la altura del consultorio.."
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        min: 1,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Ciudad
                                </InputLabel>
                                <OutlinedInput
                                    name="ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    placeholder="Ingrese la ciudad del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Provincia
                                </InputLabel>
                                <OutlinedInput
                                    name="provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    placeholder="Ingrese la provincia del consultorio.."
                                />
                            </FormControl>
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            shrink
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                            Día de la Semana
                                        </InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            sx={{ my: 1, maxHeight: 40 }}
                                            onChange={(event: SelectChangeEvent<string>) =>
                                                handleSelectChange(index, event)
                                            }>
                                            <MenuItem value="LUNES">LUNES</MenuItem>
                                            <MenuItem value="MARTES">MARTES</MenuItem>
                                            <MenuItem value="MIERCOLES">MIÉRCOLES</MenuItem>
                                            <MenuItem value="JUEVES">JUEVES</MenuItem>
                                            <MenuItem value="VIERNES">VIERNES</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            shrink
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                            Hora Inicio
                                        </InputLabel>
                                        <OutlinedInput
                                            name="horaInicio"
                                            type="time"
                                            value={horario.horaInicio}
                                            onChange={(event) =>
                                                handleHorarioChange(
                                                    'horaInicio',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="00:00:00"
                                            sx={{ my: 1, maxHeight: 40 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                            shrink
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                            Hora Fin
                                        </InputLabel>
                                        <OutlinedInput
                                            name="horaFin"
                                            type="time"
                                            value={horario.horaFin}
                                            onChange={(event) =>
                                                handleHorarioChange('horaFin', event.target.value)
                                            }
                                            placeholder="00:00:00"
                                            sx={{ my: 1, maxHeight: 40 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleRemoveHorario(index)}
                                        size="large"
                                        sx={{
                                            '&:hover': {
                                                color: 'red',
                                                padding: 'auto',
                                                margin: 'auto',
                                            },
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddHorario}
                                sx={{ mx: 25, width: '100%' }}>
                                Agregar Horario
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <h4 style={{ marginBottom: '0' }}>
                                    Seleccione una opción para médico:
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                    }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={createNewMedico}
                                                onChange={handleCheckboxChange}
                                                name="createNewMedico"
                                                sx={{ borderRadius: '100%' }}
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
                                <div style={{ width: '70%', margin: 'auto' }}>
                                    {selectExistingMedico && (
                                        <Select
                                            value={selectedMedicoId}
                                            onChange={handleSelectExistingMedicoChange}
                                            fullWidth
                                            variant="outlined"
                                            sx={{ width: '100%' }}>
                                            {existingMedicos.map((medico) => (
                                                <MenuItem key={medico.id} value={medico.id}>
                                                    {`${medico.nombre} ${medico.apellido}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </div>
                                <div>
                                    {createNewMedico && (
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Nombre
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="nombre"
                                                        value={medicoData.nombre}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el nombre del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Apellido
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="apellido"
                                                        value={medicoData.apellido}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el apellido del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Teléfono
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="telefono"
                                                        value={medicoData.telefono}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el teléfono del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Email
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="email"
                                                        value={medicoData.email}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el email del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        DNI
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="dni"
                                                        type="text"
                                                        value={medicoData.dni}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el DNI del médico"
                                                        inputProps={{
                                                            inputMode: 'numeric',
                                                            pattern: '[0-9]*',
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Fecha de Nacimiento
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="fechaNacimiento"
                                                        type="date"
                                                        value={medicoData.fechaNacimiento}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese la fecha de nacimiento del médico"
                                                        inputProps={{
                                                            max: getFormattedDate(new Date()),
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        CUIL
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="cuil"
                                                        value={medicoData.cuil}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese el CUIL del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel
                                                        shrink
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}>
                                                        Especialidad
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="especialidad"
                                                        value={medicoData.especialidad}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1, maxHeight: 40 }}
                                                        placeholder="Ingrese la especialidad del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    )}
                                </div>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Crear Consultorio
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConsultorioForm;
