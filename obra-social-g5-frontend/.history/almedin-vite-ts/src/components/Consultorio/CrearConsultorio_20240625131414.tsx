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
    Button,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent,
} from '@mui/material';
import { addMedico, getAll } from '../../api/MedicoApi';
import { createConsultorio } from '../../api/ConsultorioApi';
import { MedicoRequestDto, MedicoResponseDto } from '../../types/Medico';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../../types/Consultorio';
import UbicacionForm from './UbicacionForm';
import HorarioForm from './HorarioForm';
import {
    getFormattedDate,
    handleAddHorario,
    handleRemoveHorario,
    handleSelectChange,
    handleTimeChange,
} from '../../utils/ConsultorioUtils';

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
    /*  const handleTimeChange = (type: 'inicio' | 'fin', value: string) => {
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario) => ({
            ...horario,
            [type === 'inicio' ? 'horaInicio' : 'horaFin']: `${value}:00`,
        }));
        setOfficeData((prevData) => ({
            ...prevData,
            horarioAtencion: updatedHorarioAtencion,
        }));
    };
    const handleSelectChange = (index: number, value: string) => {
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
    }; */
    /* const getFormattedDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                        <UbicacionForm
                            ubicacion={officeData.ubicacion}
                            handleLocationChange={handleLocationChange}
                        />
                        <HorarioForm
                            horarioAtencion={officeData.horarioAtencion}
                            handleSelectChange={(index, value) =>
                                handleSelectChange(index, value, officeData, setOfficeData)
                            }
                            handleTimeChange={(type, value) =>
                                handleTimeChange(type, value, officeData, setOfficeData)
                            }
                            handleRemoveHorario={(index) =>
                                handleRemoveHorario(index, officeData, setOfficeData)
                            }
                        />

                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleAddHorario(officeData, setOfficeData)}
                                sx={{ mx: 25, width: '100%' }}> Agregar Horario</Button>
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
