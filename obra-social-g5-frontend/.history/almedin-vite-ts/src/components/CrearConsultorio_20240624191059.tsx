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
        horarioAtencion: [{ diaSemana: '', horaInicio: '', horaFin: '' }], // Ajusta según tu lógica
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
            // Paso 1: Crear el consultorio
            const consultorioResponse: ConsultorioResponseDto = await createConsultorio(officeData);
            const consultorioId = consultorioResponse.id;

            // Paso 2: Solo si se está creando un nuevo médico
            if (createNewMedico) {
                // Crear el médico con el consultorioId asociado
                const medicoToCreate: MedicoRequestDto = {
                    nombre: medicoData.nombre,
                    apellido: medicoData.apellido,
                    telefono: medicoData.telefono,
                    email: medicoData.email,
                    dni: parseInt(medicoData.dni), // Asegúrate de convertir a número si es necesario
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
    const getFormattedDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Card sx={{ maxWidth: 700, mx: 90, my: 5 }}>
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
                                <InputLabel shrink sx={{fontWeight:'bold', fontSize:'16px'}}>Calle</InputLabel>
                                <OutlinedInput
                                    name="calle"
                                    value={officeData.ubicacion.calle}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40  }}
                                    placeholder="Ingrese la calle del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5,fontWeight:'bold' }}>
                                <InputLabel shrink sx={{fontWeight:'bold', fontSize:'16px'}}>Altura</InputLabel>
                                <OutlinedInput
                                    name="altura"
                                    type="text"
                                    value={
                                        officeData.ubicacion.altura !== undefined
                                            ? officeData.ubicacion.altura.toString()
                                            : ''
                                    }
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    placeholder="Ingrese la altura del consultorio.."
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{fontWeight:'bold', fontSize:'16px'}}>Ciudad</InputLabel>
                                <OutlinedInput
                                    name="ciudad"
                                    value={officeData.ubicacion.ciudad}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1, maxHeight: 40  }}
                                    placeholder="Ingrese la ciudad del consultorio.."
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{fontWeight:'bold', fontSize:'16px'}}>Provincia</InputLabel>
                                <OutlinedInput
                                    name="provincia"
                                    value={officeData.ubicacion.provincia}
                                    onChange={handleLocationChange}
                                    sx={{ my: 1,maxHeight: 40  }}
                                    placeholder="Ingrese la provincia del consultorio.."
                                />
                            </FormControl>
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel shrink sx={{fontWeight:'bold', fontSize:'16px'}}>
                                            Día de la Semana
                                        </InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            sx={{ my: 1,maxHeight: 40  }}
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
                                        <InputLabel shrink>Hora Inicio</InputLabel>
                                        <OutlinedInput
                                            name="horaInicio"
                                            type="time"
                                            value={horario.horaInicio}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
                                            placeholder="Hora de Inicio"
                                            sx={{ my: 1,maxHeight: 40  }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel shrink>Hora Fin</InputLabel>
                                        <OutlinedInput
                                            name="horaFin"
                                            type="time"
                                            value={horario.horaFin}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
                                            placeholder="Hora de Fin"
                                            sx={{ my: 1 }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleRemoveHorario(index)}
                                        size="large">
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid item xs={4} xl={4} lg={4} md={4} sm={4}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddHorario}
                                sx={{ mt: 2, mx: 25, px: 2, width: '100%' }}>
                                Agregar Horario
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <h4>Seleccione una opción para médico:</h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '20px',
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
                                                    <InputLabel shrink>Nombre</InputLabel>
                                                    <OutlinedInput
                                                        name="nombre"
                                                        value={medicoData.nombre}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
                                                        placeholder="Ingrese el nombre del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel shrink>Apellido</InputLabel>
                                                    <OutlinedInput
                                                        name="apellido"
                                                        value={medicoData.apellido}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
                                                        placeholder="Ingrese el apellido del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel shrink>Teléfono</InputLabel>
                                                    <OutlinedInput
                                                        name="telefono"
                                                        value={medicoData.telefono}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
                                                        placeholder="Ingrese el teléfono del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel shrink>Email</InputLabel>
                                                    <OutlinedInput
                                                        name="email"
                                                        value={medicoData.email}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
                                                        placeholder="Ingrese el email del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel shrink>DNI</InputLabel>
                                                    <OutlinedInput
                                                        name="dni"
                                                        type="number"
                                                        value={medicoData.dni}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
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
                                                    <InputLabel shrink>
                                                        Fecha de Nacimiento
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        name="fechaNacimiento"
                                                        type="date"
                                                        value={medicoData.fechaNacimiento}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
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
                                                    <InputLabel shrink>CUIL</InputLabel>
                                                    <OutlinedInput
                                                        name="cuil"
                                                        value={medicoData.cuil}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
                                                        placeholder="Ingrese el CUIL del médico"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ my: 0.5 }}>
                                                    <InputLabel shrink>Especialidad</InputLabel>
                                                    <OutlinedInput
                                                        name="especialidad"
                                                        value={medicoData.especialidad}
                                                        onChange={handleMedicoDataChange}
                                                        sx={{ my: 1 }}
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
