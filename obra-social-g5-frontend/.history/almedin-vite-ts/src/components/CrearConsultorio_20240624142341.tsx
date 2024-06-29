import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    Button,
    SelectChangeEvent,
} from '@mui/material';
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
        horarioAtencion: [{ diaSemana: '', horaInicio: '', horaFin: '' }],
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
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    email: '',
                    dni: 0,
                    fechaNacimiento: '',
                    cuil: '',
                    especialidad: '',
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
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
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

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                                        <InputLabel shrink>Hora de Inicio</InputLabel>
                                        <OutlinedInput
                                            name={`horaInicio-${index}`}
                                            type="time"
                                            value={horario.horaInicio}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
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
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleHorarioChange(index, event)
                                            }
                                            inputProps={{
                                                step: 1,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <IconButton onClick={handleAddHorario}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </CardActions>
                        </Grid>

                        <Grid item xs={12} mt={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConsultorioForm;