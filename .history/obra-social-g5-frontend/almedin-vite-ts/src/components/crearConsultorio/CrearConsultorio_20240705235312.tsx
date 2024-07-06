import React, { useState, useEffect } from 'react';
import {Card,CardHeader,CardContent,CardActions,Grid,FormControl,Button,FormControlLabel,Checkbox,SelectChangeEvent,Box,Typography} from '@mui/material';
import { addMedico, getAllMedicos } from '../../assets/axios/MedicoApi';
import { createConsultorio } from '../../assets/axios/ConsultorioApi';
import { MedicoRequestDto, MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioCreateRequest, ConsultorioResponseDto } from '../../assets/models/Consultorio';
import UbicacionForm from './UbicacionForm';
import HorarioForm from './HorarioForm';
import MedicoExistenteSelect from './MedicoExistenteSelect';
import MedicoForm from '../crearMedico/MedicoForm';
import { toast } from 'react-toastify';


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
    const [medicoData, setMedicoData] = useState<MedicoRequestDto>({
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
    const [registerUser, setRegisterUser] = useState(false);
    const [useMedicoEmail, setUseMedicoEmail] = useState(false);
    const [usuarioEmail, setUsuarioEmail] = useState('');
    const [existingMedicos, setExistingMedicos] = useState<MedicoResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [createNewMedico, setCreateNewMedico] = useState(false);
    const [selectExistingMedico, setSelectExistingMedico] = useState(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

      useEffect(() => {
        const fetchMedicos = async () => {
            try {
                setIsLoading(true);
                const medicos = await getAllMedicos();
                const filteredMedicos = medicos.filter((medico) => !medico.estaEliminado);
                setExistingMedicos(filteredMedicos);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching medicos:', error);
                setError('Error al obtener los médicos');
                setIsLoading(false);
            }
        };

        fetchMedicos();
    }, []);
     if (isLoading) {
        return <p>Cargando médicos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
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
        setError(null);
        setSuccess(null);

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

                toast.success('Consultorio y médico creados correctamente.'),{
                    position: 'top-right',
                };
            } else {
                toast.success('Consultorio y médico creados correctamente.'),{
                    position: 'top-right',
                };
            }
        } catch (error) {
            toast.error('Consultorio y médico creados correctamente.'),{
                position: 'top-right',
            };
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
    <Card style={{maxWidth:'100%', textAlign: 'center', boxShadow: 'none' }}>
            <CardHeader
                title={
                    <Box sx={{ textAlign: { xs: 'center'}, mt: { xs: 2, sm: 0 } }}>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                            Registro de Consultorios
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container>
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
                            <FormControl fullWidth>
                                 <Typography variant="h6" component="h4" sx={{ my: 2, fontSize: '1rem' }}>
                                    Seleccione una opción para médico:
                                </Typography>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={createNewMedico}
                                                onChange={handleCheckboxChange}
                                                name="createNewMedico"
                                            />
                                        }
                                        label={<Typography sx={{ fontSize:{xs:'0.8rem', md:'0.9rem'} }}>Nuevo médico</Typography>}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectExistingMedico}
                                                onChange={handleCheckboxChange}
                                                name="selectExistingMedico"
                                            />
                                        }
                                        label={<Typography sx={{ fontSize:{xs:'0.8rem', md:'0.9rem'} }}>Médico existente</Typography>}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={!createNewMedico && !selectExistingMedico}
                                                onChange={handleNoMedicoSelection}
                                                name="noMedico"
                                            />
                                        }
                                        label={<Typography sx={{ fontSize:{xs:'0.8rem', md:'0.9rem'} }}>No asignar médico</Typography>}
                                    />
                                </div>
                                <div style={{width: '100%', margin: 'auto' }}>
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
                                         <MedicoForm
                                        medicoData={medicoData}
                                        setMedicoData={setMedicoData}
                                        setRegisterUser={setRegisterUser}
                                        useMedicoEmail={useMedicoEmail}
                                        setUseMedicoEmail={setUseMedicoEmail}
                                        usuarioEmail={usuarioEmail}
                                        setUsuarioEmail={setUsuarioEmail}
                                        registerUser={registerUser}
                                    />
                                       
                                    )}
                                </div>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={3} mx={{ md: '40%', sm: 0 }} padding={0}>
                            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Crear Consultorio
                                </Button>
                            </CardActions>
                        </Grid>
                        {error && (
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                        )}
                        {success && (
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography color="primary">{success}</Typography>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ConsultorioForm;
