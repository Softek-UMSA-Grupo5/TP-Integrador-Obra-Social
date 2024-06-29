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
import MedicoExistenteSelect from '../Consultorio/MedicoExistenteSelect';
import ConsultorioSelect from '../Consultorio/ConsultorioSelect';
import { MedicoResponseDto } from '../../types/Medico';
import { ConsultorioResponseDto } from '../../types/Consultorio';
import { SelectChangeEvent } from '@mui/material/Select';
import { MedicoRequestDto } from '../../types/Medico';
import { addMedico } from '../../axios/MedicoApi';
import { getAllMedicos } from '../../axios/MedicoApi';
import { getAllConsultorios } from '../../axios/ConsultorioApi';

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [showMedicoOptions, setShowMedicoOptions] = useState<boolean>(false);
    const [isExistingMedico, setIsExistingMedico] = useState<boolean>(false);
    const [isNewMedico, setIsNewMedico] = useState<boolean>(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);
    const [selectedConsultorioId, setSelectedConsultorioId] = useState<number | undefined>(
        undefined
    );
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [medicos, setMedicos] = useState<MedicoResponseDto[]>([]);
    const [consultorios, setConsultorios] = useState<ConsultorioResponseDto[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [medicosResponse, consultoriosResponse] = await Promise.all([
                getAllMedicos(),
                getAllConsultorios()
            ]);
            setMedicos(medicosResponse);
            setConsultorios(consultoriosResponse);
        } catch (error) {
            console.error('Error al obtener datos', error);
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
        if (value === UsuarioRolesEnum.ROL_MEDICO) {
            setShowMedicoOptions(true);
        } else {
            setShowMedicoOptions(false);
            setIsExistingMedico(false);
            setIsNewMedico(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await registrarUsuario(usuarioData, selectedRol);
            if (
                selectedRol === UsuarioRolesEnum.ROL_MEDICO &&
                isExistingMedico &&
                selectedMedicoId &&
                selectedConsultorioId
            ) {
                // Preparar datos del médico para agregar
                const medicoData: MedicoRequestDto[] = [
                    {
                        nombre:
                            medicos.find((medico) => medico.id === selectedMedicoId)
                                ?.nombre ?? '',
                        apellido:
                            medicos.find((medico) => medico.id === selectedMedicoId)
                                ?.apellido ?? '',
                        telefono: '',
                        email: '',
                        dni: 0,
                        fechaNacimiento: '',
                        cuil: '',
                        especialidad: '',
                        consultoriosId: [selectedConsultorioId],
                    },
                ];

                await addMedico(medicoData);
            }
            setSuccess(true);
        } catch (error) {
            setError('Error al registrar el usuario');
        }
    };

    const handleSelectExistingMedicoChange = (event: SelectChangeEvent<number>) => {
        setSelectedMedicoId(Number(event.target.value));
    };

    const handleSelectConsultorioChange = (event: SelectChangeEvent<number>) => {
        setSelectedConsultorioId(Number(event.target.value));
    };

    return (
        <Card>
            <CardHeader title="Registro de Usuario" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="username-input">Usuario</InputLabel>
                                <OutlinedInput
                                    id="username-input"
                                    type="text"
                                    name="username"
                                    value={usuarioData.username}
                                    onChange={handleInputChange}
                                    label="Usuario"
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="password-input">Contraseña</InputLabel>
                                <OutlinedInput
                                    id="password-input"
                                    type="password"
                                    name="password"
                                    value={usuarioData.password}
                                    onChange={handleInputChange}
                                    label="Contraseña"
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="email-input">Correo Electrónico</InputLabel>
                                <OutlinedInput
                                    id="email-input"
                                    type="email"
                                    name="email"
                                    value={usuarioData.email}
                                    onChange={handleInputChange}
                                    label="Correo Electrónico"
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="rol-select-label">Rol</InputLabel>
                                <Select
                                    labelId="rol-select-label"
                                    id="rol-select"
                                    value={selectedRol}
                                    onChange={handleSelectChange}
                                    label="Rol"
                                    required
                                >
                                    <MenuItem value={UsuarioRolesEnum.ROL_SOCIO}>Socio</MenuItem>
                                    <MenuItem value={UsuarioRolesEnum.ROL_MEDICO}>Médico</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {showMedicoOptions && (
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isExistingMedico}
                                            onChange={(e) => setIsExistingMedico(e.target.checked)}
                                            name="existingMedico"
                                        />
                                    }
                                    label="Seleccionar médico existente"
                                />
                                {isExistingMedico && (
                                    <MedicoExistenteSelect
                                        existingMedicos={medicos}
                                        selectedMedicoId={selectedMedicoId}
                                        handleSelectExistingMedicoChange={handleSelectExistingMedicoChange}
                                    />
                                )}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isNewMedico}
                                            onChange={(e) => setIsNewMedico(e.target.checked)}
                                            name="newMedico"
                                        />
                                    }
                                    label="Crear nuevo médico"
                                />
                            </Grid>
                        )}
                        {isNewMedico && (
                            <Grid item xs={12}>
                                <ConsultorioSelect
                                    consultorios={consultorios}
                                    selectedConsultorioId={selectedConsultorioId}
                                    handleSelectConsultorioChange={handleSelectConsultorioChange}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary">
                        Registrar
                    </Button>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="primary" variant="body2">
                            Usuario registrado exitosamente
                        </Typography>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default UsuarioForm;
