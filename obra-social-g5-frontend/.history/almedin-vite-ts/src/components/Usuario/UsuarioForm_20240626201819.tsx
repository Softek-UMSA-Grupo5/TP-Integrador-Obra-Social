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
import MedicoNuevoForm from '../Medico/MedicoNuevoForm';
import ConsultorioSelect from '../Consultorio/ConsultorioSelect';
import { MedicoResponseDto } from '../../types/Medico';
import { ConsultorioResponseDto } from '../../types/Consultorio';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAllConsultorios } from '../../axios/ConsultorioApi'; // Ajusta la importación según tu estructura
import { getAllMedicos } from '../../axios/MedicoApi'; // Ajusta la importación según tu estructura

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [showMedicoOptions, setShowMedicoOptions] = useState<boolean>(false);
    const [isExistingMedico, setIsExistingMedico] = useState<boolean>(false);
    const [medicoData, setMedicoData] = useState<MedicoResponseDto>({
        id: 0, // Asigna un valor adecuado si no es 0
        estaEliminado: false, // Asigna un valor adecuado si no es false
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
    const [selectedConsultorioId, setSelectedConsultorioId] = useState<number | undefined>(undefined);
    const [medicos, setMedicos] = useState<MedicoResponseDto[]>([]);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);
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
            await registrarUsuario(usuarioData, selectedRol);
            setSuccess(true);
        } catch (error) {
            setError('Error al registrar el usuario');
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
    };

    return (
        <Card>
            <CardHeader title="Registrar Usuario" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Username</InputLabel>
                                <OutlinedInput
                                    name="username"
                                    value={usuarioData.username}
                                    onChange={handleInputChange}
                                    label="Username"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type="password"
                                    value={usuarioData.password}
                                    onChange={handleInputChange}
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    name="email"
                                    value={usuarioData.email}
                                    onChange={handleInputChange}
                                    label="Email"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Rol</InputLabel>
                                <Select
                                    value={selectedRol}
                                    onChange={handleSelectChange}
                                    input={<OutlinedInput label="Rol" />}
                                >
                                    {Object.values(UsuarioRolesEnum).map((rol) => (
                                        <MenuItem key={rol} value={rol}>
                                            {rol}
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
                                </Grid>
                                {isExistingMedico ? (
                                    <>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Médico</InputLabel>
                                                <Select
                                                    value={selectedMedicoId}
                                                    onChange={handleSelectMedicoChange}
                                                    input={<OutlinedInput label="Médico" />}
                                                >
                                                    {medicos.map((medico) => (
                                                        <MenuItem key={medico.id} value={medico.id}>
                                                            {medico.nombre} {medico.apellido}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ConsultorioSelect
                                                consultorios={consultorios}
                                                selectedConsultorioId={selectedConsultorioId}
                                                handleSelectConsultorioChange={handleSelectConsultorioChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <MedicoNuevoForm
                                            medicoData={medicoData}
                                            handleMedicoDataChange={handleMedicoDataChange}
                                        />
                                        <Grid item xs={12}>
                                            <ConsultorioSelect
                                                consultorios={consultorios}
                                                selectedConsultorioId={selectedConsultorioId}
                                                handleSelectConsultorioChange={handleSelectConsultorioChange}
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
                            <Grid item xs={12}>
                                <Typography color="success">Usuario registrado exitosamente</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
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
