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
import { addMedico, getAll } from '../../api/MedicoApi';
import { createConsultorio } from '../../api/ConsultorioApi';
import { MedicoRequestDto, MedicoResponseDto } from '../../types/Medico';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../../types/Consultorio';

const ConsultorioForm: React.FC = () => {
    const [officeData, setOfficeData] = useState<ConsultorioCreateRequest>({
        id: undefined,
        horarioAtencion: [{ diaSemana: 'LUNES', horaInicio: '08:00:00', horaFin: '12:00:00' }],
        ubicacion: {
            ciudad: '',
            provincia: '',
            calle: '',
            altura: 0,
        },
    });
    const [medicoData, setMedicoData] = useState<MedicoRequestDto>({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: parseInt(''),
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
                    ...medicoData,
                    dni: medicoData.dni,
                    consultoriosId: [consultorioId],
                };

                await addMedico([medicoToCreate]);

                console.log('Consultorio y médico creados correctamente.');
                alert('Consultorio y médico creados correctamente.');
            } else {
                console.log('Consultorio creado correctamente.');
                alert('Consultorio creado correctamente.');
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

        if (name === 'altura') {
            const alturaValue = value === '' ? 0 : parseInt(value, 10);
            setOfficeData((prevData) => ({
                ...prevData,
                ubicacion: {
                    ...prevData.ubicacion,
                    altura: isNaN(alturaValue) ? 0 : alturaValue,
                },
            }));
        } else {
            setOfficeData((prevData) => ({
                ...prevData,
                ubicacion: {
                    ...prevData.ubicacion,
                    [name]: value,
                },
            }));
        }
    };

    const handleTimeChange = (type: 'inicio' | 'fin', value: string) => {
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario) => ({
            ...horario,
            [type === 'inicio' ? 'horaInicio' : 'horaFin']: `${value}:00`,
        }));
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
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

    const generateTimeOptions = () => {
        const options: JSX.Element[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const hourStr = String(hour).padStart(2, '0');
                const minuteStr = String(minute).padStart(2, '0');
                options.push(
                    <MenuItem key={`${hourStr}:${minuteStr}`} value={`${hourStr}:${minuteStr}`}>
                        {`${hourStr}:${minuteStr}`}
                    </MenuItem>
                );
            }
        }
        return options;
    };

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
                        <Grid item xs={12}>
                            <Card sx={{ p: 2 }}>
                                <CardHeader
                                    title="Horarios de Atención"
                                    subheader="Defina los horarios de atención del consultorio"
                                    sx={{ textAlign: 'center', mb: 2 }}
                                />
                                <CardContent>
                                    {officeData.horarioAtencion.map((horario, index) => (
                                        <Grid key={index} container spacing={2}>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                        Día de la Semana
                                                    </InputLabel>
                                                    <Select
                                                        value={horario.diaSemana}
                                                        onChange={(e) => handleSelectChange(index, e)}
                                                        label="Día de la Semana"
                                                        sx={{ my: 1 }}
                                                    >
                                                        <MenuItem value="LUNES">Lunes</MenuItem>
                                                        <MenuItem value="MARTES">Martes</MenuItem>
                                                        <MenuItem value="MIERCOLES">Miércoles</MenuItem>
                                                        <MenuItem value="JUEVES">Jueves</MenuItem>
                                                        <MenuItem value="VIERNES">Viernes</MenuItem>
                                                        <MenuItem value="SABADO">Sábado</MenuItem>
                                                        <MenuItem value="DOMINGO">Domingo</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                        Hora de Inicio
                                                    </InputLabel>
                                                    <Select
                                                        value={horario.horaInicio}
                                                        onChange={(e) => handleTimeChange('inicio', e.target.value as string)}
                                                        label="Hora de Inicio"
                                                        sx={{ my: 1 }}
                                                    >
                                                        {generateTimeOptions()}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                                    <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                        Hora de Fin
                                                    </InputLabel>
                                                    <Select
                                                        value={horario.horaFin}
                                                        onChange={(e) => handleTimeChange('fin', e.target.value as string)}
                                                        label="Hora de Fin"
                                                        sx={{ my: 1 }}
                                                    >
                                                        {generateTimeOptions()}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <IconButton onClick={() => handleRemoveHorario(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Button
                                        onClick={handleAddHorario}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                    >
                                        Agregar Horario
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CardActions>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
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
