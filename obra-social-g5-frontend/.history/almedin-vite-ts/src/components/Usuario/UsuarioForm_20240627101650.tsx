import React, { useState, useEffect } from 'react';
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardHeader,
    CardContent,
    Grid,
    OutlinedInput,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../types/Usuario';
import { registrarUsuario } from '../../axios/UsuarioApi';
import MedicoNuevoForm from '../Consultorio/MedicoNuevoForm';
import ConsultorioSelect from '../Consultorio/ConsultorioSelect';
import { MedicoResponseDto } from '../../types/Medico';
import { ConsultorioResponseDto } from '../../types/Consultorio';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAllConsultorios } from '../../axios/ConsultorioApi';
import { getAllMedicos, addMedico, updateMedico } from '../../axios/MedicoApi';
import MedicoExistenteSelect from '../Consultorio/MedicoExistenteSelect';

const formatRol = (rol: UsuarioRolesEnum) => rol.replace('ROL_', '').toLowerCase();
const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
        rol: UsuarioRolesEnum.ROL_SOCIO,
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [showMedicoOptions, setShowMedicoOptions] = useState<boolean>(false);
    const [isExistingMedico, setIsExistingMedico] = useState<boolean>(false);
    const [isNewMedico, setIsNewMedico] = useState<boolean>(false);
    const [medicoData, setMedicoData] = useState<MedicoResponseDto>({
        id: 0,
        estaEliminado: false,
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
    const [consultorios, setConsultorios] = useState<ConsultorioResponseDto[]>([]);
    const [selectedConsultorioId, setSelectedConsultorioId] = useState<number | undefined>(
        undefined
    );
    const [medicos, setMedicos] = useState<MedicoResponseDto[]>([]);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        fetchConsultorios();
        fetchMedicos();
    }, []);

    const fetchConsultorios = async () => {
        try {
            const consultoriosData = await getAllConsultorios();
            setConsultorios(consultoriosData);
        } catch (error) {
            console.error('Error al obtener los consultorios', error);
        }
    };

    const fetchMedicos = async () => {
        try {
            const medicosData = await getAllMedicos();
            setMedicos(medicosData);
        } catch (error) {
            console.error('Error al obtener los médicos', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuarioData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<UsuarioRolesEnum>) => {
        const { value } = e.target;
        setSelectedRol(value as UsuarioRolesEnum);
        setShowMedicoOptions(value === UsuarioRolesEnum.ROL_MEDICO);
        if (value !== UsuarioRolesEnum.ROL_MEDICO) {
            setIsExistingMedico(false);
            setIsNewMedico(false);
        }
    };

    const handleMedicoDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMedicoData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            if (isNewMedico) {
                const medicoNuevo = { ...medicoData, consultoriosId: [selectedConsultorioId!] };
                await addMedico([medicoNuevo]);
            } else if (isExistingMedico && selectedMedicoId !== undefined) {
                const medicoExistente = medicos.find((medico) => medico.id === selectedMedicoId);
                if (medicoExistente) {
                    if (!medicoExistente.consultoriosId) {
                        medicoExistente.consultoriosId = [];
                    }
                    if (!medicoExistente.consultoriosId.includes(selectedConsultorioId!)) {
                        medicoExistente.consultoriosId.push(selectedConsultorioId!);
                        await updateMedico(selectedMedicoId, medicoExistente);
                    }
                }
            }

            if (isExistingMedico) {
                await registrarUsuario(usuarioData, UsuarioRolesEnum.ROL_MEDICO);
            } else {
                await registrarUsuario(usuarioData, selectedRol);
            }

            setSuccess(true);
        } catch (error) {
            setError('Error al registrar el usuario');
            console.error('Error:', error);
        }
    };
    const handleSelectConsultorioChange = (event: SelectChangeEvent<number>) => {
        setSelectedConsultorioId(Number(event.target.value));
    };

    const handleSelectMedicoChange = (event: SelectChangeEvent<number>) => {
        setSelectedMedicoId(Number(event.target.value));
    };

    const handleExistingMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsExistingMedico(event.target.checked);
        setIsNewMedico(false); 
    };

    const handleNewMedicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNewMedico(event.target.checked);
        setIsExistingMedico(false);
    };

    return (
        <Card style={{ width: '100%', height: '100%' }}>
            <CardHeader
                title="Registrar Usuario"
                subheader="Ingresa los datos para crear un usuario"
                sx={{ textAlign: 'center', fontFamily: 'Roboto' }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} p={5}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    value={usuarioData.username}
                                    onChange={handleInputChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    name="password"
                                    type="password"
                                    placeholder="Constraseña"
                                    value={usuarioData.password}
                                    onChange={handleInputChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    name="email"
                                    value={usuarioData.email}
                                    onChange={handleInputChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    placeholder="Email"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Rol
                                </InputLabel>
                                <Select
                                    value={selectedRol}
                                    onChange={handleSelectChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    input={<OutlinedInput />}>
                                    {Object.values(UsuarioRolesEnum).map((rol) => (
                                        <MenuItem key={rol} value={rol}>
                                            {formatRol(rol)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {showMedicoOptions && (
                            <>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isExistingMedico}
                                                onChange={handleExistingMedicoChange}
                                                name="existingMedico"
                                                color="primary"
                                            />
                                        }
                                        label="Seleccionar Médico ya existente"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isNewMedico}
                                                onChange={handleNewMedicoChange}
                                                name="newMedico"
                                                color="primary"
                                            />
                                        }
                                        label="Crear Nuevo Médico"
                                    />
                                </Grid>
                                {isExistingMedico && (
                                    <>
                                        <Grid item xs={12}>
                                            <MedicoExistenteSelect
                                                existingMedicos={medicos}
                                                selectedMedicoId={selectedMedicoId}
                                                handleSelectExistingMedicoChange={
                                                    handleSelectMedicoChange
                                                }
                                            />
                                        </Grid>
                                        <Grid item sx={12}>
                                            <ConsultorioSelect
                                                consultorios={consultorios}
                                                selectedConsultorioId={selectedConsultorioId}
                                                handleSelectConsultorioChange={
                                                    handleSelectConsultorioChange
                                                }
                                            />
                                        </Grid>
                                    </>
                                )}
                                {isNewMedico && (
                                    <>
                                        <MedicoNuevoForm
                                            medicoData={medicoData}
                                            handleMedicoDataChange={handleMedicoDataChange}
                                        />
                                        <Grid item xs={12}>
                                            <ConsultorioSelect
                                                consultorios={consultorios}
                                                selectedConsultorioId={selectedConsultorioId}
                                                handleSelectConsultorioChange={
                                                    handleSelectConsultorioChange
                                                }
                                            />
                                        </Grid>
                                    </>
                                )}
                            </>
                        )}
                        {error && (
                            <Grid item xs={12}>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                        )}
                        {success && (
                            <Grid item xs={12} mx={20}>
                                <Typography color="primary">
                                    Usuario registrado con éxito
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default UsuarioForm;
