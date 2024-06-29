import React, { useState, useEffect, ChangeEvent } from 'react';
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
    FormHelperText,
    Input,
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

const ConsultorioForm: React.FC = () => {
    const [officeData, setOfficeData] = useState<ConsultorioCreateRequest>({
        id: undefined,
        horarioAtencion: [{ diaSemana: '', horaInicio: '00:00:00', horaFin: '00:00:00' }], 
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
                const medicos = await getAll();
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

    const handleSelectExistingMedicoChange = (event: SelectChangeEvent<number>) => {
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
            const consultorioResponse: ConsultorioResponseDto = await createConsultorio(officeData);
            const consultorioId = consultorioResponse.id;

            if (createNewMedico) {
                const medicoToCreate: MedicoRequestDto = {
                    nombre: medicoData.nombre,
                    apellido: medicoData.apellido,
                    telefono: medicoData.telefono,
                    email: medicoData.email,
                    dni: parseInt(medicoData.dni),
                    fechaNacimiento: medicoData.fechaNacimiento,
                    cuil: medicoData.cuil,
                    especialidad: medicoData.especialidad,
                    consultoriosId: [consultorioId],
                };

                await addMedico([medicoToCreate]);

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

    const handleHorarioChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Validar que solo se ingresen números y ":" y que no se eliminen los ":"
        const cleanedValue = value.replace(/[^\d:]/g, '');

        // Formatear el valor para mantener el formato HH:mm:ss
        const formattedTime = formatTimeInput(cleanedValue);

        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index ? { ...horario, [name]: formattedTime } : horario
        );

        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    };

  /*   const handleHorarioBlur = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const formattedTime = formatTimeInput(value);

        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index ? { ...horario, [name]: formattedTime } : horario
        );

        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    }; */

    const handleSelectChange = (index: number, event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index ? { ...horario, diaSemana: value } : horario
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

    const formatTimeInput = (value: string): string => {
        // Limpiar el valor para mantener solo números y ":"
        const cleanedValue = value.replace(/[^\d:]/g, '');

        // Dividir en horas, minutos y segundos
        const parts = cleanedValue.split(':');

        // Obtener horas, minutos y segundos del input
        let hours = parseInt(parts[0], 10) || 0;
        let minutes = parseInt(parts[1], 10) || 0;
        let seconds = parseInt(parts[2], 10) || 0;

        // Validar que las horas estén entre 0 y 23, minutos y segundos entre 0 y 59
        hours = Math.max(0, Math.min(hours, 23));
        minutes = Math.max(0, Math.min(minutes, 59));
        seconds = parseInt('00');
        // Segundos siempre '00'

        // Formatear con los dos puntos automáticamente
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

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
                                    <FormControl>
                                        <InputLabel htmlFor="horaInicio">Hora Inicio</InputLabel>
                                        <Input
                                            id="horaInicio"
                                            type="text"
                                            name="horaInicio"
                                            value={officeData.horarioAtencion[0].horaInicio}
                                            onChange={(e) => handleHorarioChange(0, e)}
                                        />
                                        <FormHelperText>Formato: HH:mm:ss</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="horaFin">Hora Fin</InputLabel>
                                        <Input
                                            id="horaFin"
                                            type="text"
                                            name="horaFin"
                                            value={officeData.horarioAtencion[0].horaFin}
                                            onChange={handleHorarioChange.bind(null, 0)}
                                        />
                                        <FormHelperText>Formato: HH:mm:ss</FormHelperText>
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
