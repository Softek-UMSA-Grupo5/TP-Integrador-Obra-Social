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
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addMedico, getAllMedicos } from '../api/MedicoApi';
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
        horarioAtencion: [{ diaSemana: '', horaInicio: '', horaFin: '' }], // Ajusta según tu lógica
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: 0,
        },
    });

    const [existingMedicos, setExistingMedicos] = useState<MedicoResponseDto[]>([]);
    const [createNewMedico, setCreateNewMedico] = useState(false);
    const [selectExistingMedico, setSelectExistingMedico] = useState(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);
    const [medicoData, setMedicoData] = useState<MedicoRequestDto>({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: 0,
        fechaNacimiento: '',
        cuil: '',
        especialidad: '',
        consultoriosId: [],
    });

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const medicos = await getAllMedicos();
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

    const handleMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMedicoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Paso 1: Crear el consultorio
            const consultorioResponse: ConsultorioResponseDto = await createConsultorio(officeData);
            const consultorioId = consultorioResponse.id;

            // Paso 2: Solo si se está creando un nuevo médico
            if (createNewMedico) {
                // Crear el médico con el consultorioId asociado
                const medicoToCreate: MedicoRequestDto = {
                    ...medicoData,
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

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOfficeData((prevData) => ({
            ...prevData,
            ubicacion: {
                ...prevData.ubicacion,
                [name]: value,
            },
        }));
    };

    const handleHorarioChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index ? { ...horario, [name]: addSecondsToTime(value) } : horario
        );
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    };

    const addSecondsToTime = (time: string): string => {
        // Asegurarse de que haya dos puntos en el tiempo
        if (time.split(':').length === 2) {
            return `${time}:00`;
        }
        return time;
    };

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

    return (
        <Card sx={{ maxWidth: 600, mx: 80, my: 5 }}>
            <CardHeader
                title="Actualizar Consultorio"
                subheader="Modificación de consultorio en el sistema"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Calle</InputLabel>
                                <OutlinedInput
                                    name="calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1 }}
                                    placeholder="Ingrese la calle del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Altura</InputLabel>
                                <OutlinedInput
                                    name="altura"
                                    type="text"
                                    value={
                                        officeData.ubicacion.altura !== undefined
                                            ? officeData.ubicacion.altura.toString()
                                            : ''
                                    }
                                    onChange={handleLocationChange}
                                    sx={{ my: 1 }}
                                    placeholder="Ingrese la altura del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Ciudad</InputLabel>
                                <OutlinedInput
                                    name="ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1 }}
                                    placeholder="Ingrese la ciudad del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink>Provincia</InputLabel>
                                <OutlinedInput
                                    name="provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1 }}
                                    placeholder="Ingrese la provincia del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} sx={{ my: 0.5 }}>
                                {officeData.horarioAtencion.map((horario, index) => (
                                    <Grid item xs={12} key={index}>
                                        <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                                            <InputLabel shrink>Día de la Semana</InputLabel>
                                            <Select
                                                name={`diaSemana-${index}`}
                                                value={horario.diaSemana}
                                                onChange={(event) => handleSelectChange(index, event)}
                                                input={<OutlinedInput notched label="Día de la Semana" />}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="Lunes">Lunes</MenuItem>
                                                <MenuItem value="Martes">Martes</MenuItem>
                                                <MenuItem value="Miércoles">Miércoles</MenuItem>
                                                <MenuItem value="Jueves">Jueves</MenuItem>
                                                <MenuItem value="Viernes">Viernes</MenuItem>
                                                <MenuItem value="Sábado">Sábado</MenuItem>
                                                <MenuItem value="Domingo">Domingo</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                                                    <InputLabel shrink>Hora de Inicio</InputLabel>
                                                    <OutlinedInput
                                                        name={`horaInicio-${index}`}
                                                        type="time"
                                                        value={horario.horaInicio}
                                                        onChange={(event) => handleHorarioChange(index, event)}
                                                        inputProps={{
                                                            step: 1,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                                                    <InputLabel shrink>Hora de Fin</InputLabel>
                                                    <OutlinedInput
                                                        name={`horaFin-${index}`}
                                                        type="time"
                                                        value={horario.horaFin}
                                                        onChange={(event) => handleHorarioChange(index, event)}
                                                        inputProps={{
                                                            step: 1,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <IconButton
                                            color="secondary"
                                            aria-label="delete"
                                            onClick={() => handleRemoveHorario(index)}
                                            sx={{ mt: 1 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleAddHorario}>
                                        Agregar Horario
                                    </Button>
                                </Grid>
                            </Grid>
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
                                label="Crear nuevo médico"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectExistingMedico}
                                        onChange={handleCheckboxChange}
                                        name="selectExistingMedico"
                                    />
                                }
                                label="Seleccionar médico existente"
                            />
                            <Button onClick={handleNoMedicoSelection}>No seleccionar médico</Button>
                        </Grid>
                        {createNewMedico && (
                            <>
                                <Grid item xs={6}>
                                    <TextField
                                        name="nombre"
                                        label="Nombre"
                                        value={medicoData.nombre}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="apellido"
                                        label="Apellido"
                                        value={medicoData.apellido}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="telefono"
                                        label="Teléfono"
                                        value={medicoData.telefono}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        value={medicoData.email}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="dni"
                                        label="DNI"
                                        value={medicoData.dni}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="fechaNacimiento"
                                        label="Fecha de Nacimiento"
                                        type="date"
                                        value={medicoData.fechaNacimiento}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="cuil"
                                        label="CUIL"
                                        value={medicoData.cuil}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="especialidad"
                                        label="Especialidad"
                                        value={medicoData.especialidad}
                                        onChange={handleMedicoChange}
                                        fullWidth
                                    />
                                </Grid>
                            </>
                        )}
                        {selectExistingMedico && (
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                    <InputLabel shrink>Médico Existente</InputLabel>
                                    <Select
                                        value={selectedMedicoId}
                                        onChange={handleSelectExistingMedicoChange}
                                        input={<OutlinedInput notched label="Médico Existente" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {existingMedicos.map((medico) => (
                                            <MenuItem key={medico.id} value={medico.id}>
                                                {medico.nombre} {medico.apellido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                    <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Crear Consultorio
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConsultorioForm;