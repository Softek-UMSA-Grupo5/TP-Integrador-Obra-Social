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
import { getAll } from '../api/MedicoApi';
import DeleteIcon from '@mui/icons-material/Delete';

// Define el tipo de datos para el estado del formulario
interface MedicoResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    cuil: string;
    fechaNacimiento: string;
    estaEliminado: boolean;
    especialidad: string;
}

interface OfficeData {
    ubicacion: {
        calle: string;
        altura: number | undefined;
        ciudad: string;
        provincia: string;
    };
    horarioAtencion: {
        diaSemana: string;
        horaInicio: string;
        horaFin: string;
    }[];
    medico: {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        dni: number | undefined;
        fechaNacimiento: string;
        cuil: string;
        especialidad: string;
    };
}

// Componente principal
const ConsultorioForm: React.FC = () => {
    const [officeData, setOfficeData] = useState<OfficeData>({
        ubicacion: {
            calle: '',
            altura: undefined,
            ciudad: '',
            provincia: '',
        },
        horarioAtencion: [
            {
                diaSemana: '',
                horaInicio: '',
                horaFin: '',
            },
        ],
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
            if (selectExistingMedico && selectedMedicoId !== undefined) {
                const selectedMedico = existingMedicos.find((medico) => medico.id === selectedMedicoId);
                if (selectedMedico) {
                    setOfficeData((prevData) => ({
                        ...prevData,
                        medico: selectedMedico,
                    }));
                }
            }

            // Aquí debes llamar a la función de tu API para actualizar el consultorio con officeData
            // await updateConsultorio(officeData);

            console.log('Formulario enviado con éxito:', officeData);
            alert('Formulario enviado con éxito!');
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario. Por favor, inténtelo nuevamente.');
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
            i === index ? { ...horario, [name]: value } : horario
        );
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

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', my: 5 }}>
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
                                    placeholder="Ingrese la provincia del consultorio.."
                                />
                            </FormControl>
                        </Grid>

                        {officeData.horarioAtencion.map((horario, index) => (
                            <Grid container spacing={2} key={index} my={2} ml={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel shrink>Día de la Semana</InputLabel>
                                        <Select
                                            name="diaSemana"
                                            value={horario.diaSemana}
                                            onChange={(event: SelectChangeEvent<string>) =>
                                                handleSelectChange(index, event)
                                            }
                                            label="Día de la Semana">
                                            <MenuItem value="LUNES">LUNES</MenuItem>
                                            <MenuItem value="MARTES">MARTES</MenuItem>
                                            <MenuItem value="MIÉRCOLES">MIÉRCOLES</MenuItem>
                                            <MenuItem value="JUEVES">JUEVES</MenuItem>
                                            <MenuItem value="VIERNES">VIERNES</MenuItem>
                                            <MenuItem value="SÁBADO">SÁBADO</MenuItem>
                                            <MenuItem value="DOMINGO">DOMINGO</MenuItem>
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

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddHorario}
                                sx={{ mt: 2 }}>
                                Agregar Horario
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <InputLabel>Seleccione una opción para médico:</InputLabel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    </Grid>

                    <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Actualizar Consultorio
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConsultorioForm;
