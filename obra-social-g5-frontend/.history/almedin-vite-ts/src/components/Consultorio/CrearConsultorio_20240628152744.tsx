import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    FormControl,
    Button,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent,
    Box,
    Typography,
} from '@mui/material';
import { addMedico, getAllMedicos } from '../../axios/MedicoApi';
import { createConsultorio } from '../../axios/ConsultorioApi';
import { MedicoRequestDto, MedicoResponseDto } from '../../models/Medico';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../../models/Consultorio';
import UbicacionForm from './UbicacionForm';
import HorarioForm from './HorarioForm';
import MedicoExistenteSelect from './MedicoExistenteSelect';
import MedicoNuevoForm from './MedicoNuevoForm';

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
        medicoId: undefined,
    });
    const [medicoData, setMedicoData] = useState<{
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        dni: number;
        fechaNacimiento: string;
        cuil: string;
        especialidad: string;
        consultoriosId: number[];
    }>({
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
        const medicoId = event.target.value as number;
        setSelectedMedicoId(medicoId);
        setOfficeData((prevData) => ({
            ...prevData,
            medicoId: medicoId,
        }));
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
                    dni: medicoData.dni,
                    fechaNacimiento: medicoData.fechaNacimiento,
                    cuil: medicoData.cuil,
                    especialidad: medicoData.especialidad,
                    consultoriosId: [consultorioId],
                };

                await addMedico([medicoToCreate]);

                alert('Consultorio y médico creados correctamente.');
            } else {
                alert('Consultorio creado correctamente.');
            }
        } catch (error) {
            alert('Error al crear el consultorio y/o médico. Por favor, inténtelo nuevamente.');
        }
    };
    const handleMedicoDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if ((name === 'nombre' || name === 'apellido') && value.length > 20) {
            return;
        }
        if (name === 'especialidad' && value.length > 50) {
            return;
        }
        if (name === 'telefono' && value.length > 10) {
            return;
        }
        if (name === 'cuil' && value.length > 15) {
            return;
        }

        if (name === 'dni') {
            const dniValue = value === '' ? 0 : parseInt(value, 10);
            setMedicoData((prevData) => ({
                ...prevData,
                dni: isNaN(dniValue) ? 0 : dniValue,
            }));
        } else {
            setMedicoData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
    const handleTimeChange = (index: number, type: 'inicio' | 'fin', value: string) => {
        const updatedHorarioAtencion = officeData.horarioAtencion.map((horario, i) =>
            i === index
                ? { ...horario, [type === 'inicio' ? 'horaInicio' : 'horaFin']: `${value}:00` }
                : horario
        );
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
                { diaSemana: 'LUNES', horaInicio: '08:00:00', horaFin: '12:00:00' },
            ],
        }));
    };

    return (
        <Card style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            <CardHeader
                title={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: 2,
                            borderColor: 'gray.200',
                            pb: 4,
                            width: '100%',
                        }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                textAlign: { xs: 'center', sm: 'left' },
                            }}>
                            Almedin
                        </Typography>
                        <Box
                            sx={{ textAlign: { xs: 'center', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                                Registro de Consultorio
                            </Typography>
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} style={{ width: '70%', margin: 'auto' }}>
                        <UbicacionForm
                            ubicacion={officeData.ubicacion}
                            handleLocationChange={handleLocationChange}
                        />
                        <HorarioForm
                            horarioAtencion={officeData.horarioAtencion}
                            handleSelectChange={handleSelectChange}
                            handleTimeChange={handleTimeChange}
                            handleRemoveHorario={handleRemoveHorario}
                            handleAddHorario={handleAddHorario}
                        />

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <h4 style={{ marginBottom: '0' }}>
                                    Seleccione una opción para médico:
                                </h4>
                                <div>
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
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!createNewMedico && !selectExistingMedico}
                                                onChange={handleNoMedicoSelection}
                                                name="noMedico"
                                            />
                                        }
                                        label="No asociar ningún Médico"
                                    />
                                </div>
                                <div style={{ width: '70%', margin: 'auto' }}>
                                    {selectExistingMedico && (
                                        <MedicoExistenteSelect
                                            existingMedicos={existingMedicos}
                                            selectedMedicoId={selectedMedicoId}
                                            handleSelectExistingMedicoChange={
                                                handleSelectExistingMedicoChange
                                            }
                                        />
                                    )}
                                </div>
                                <div>
                                    {createNewMedico && (
                                        <MedicoNuevoForm
                                            medicoData={medicoData}
                                            handleMedicoDataChange={handleMedicoDataChange}
                                        />
                                    )}
                                </div>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={3} mx={{ md: '35%', sm: 0 }} padding={0}>
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
