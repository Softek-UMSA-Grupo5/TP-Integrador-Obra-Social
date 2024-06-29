import React, { useState } from 'react';
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
    Checkbox,
    FormControlLabel,
    SelectChangeEvent,
} from '@mui/material';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../types/Usuario';
import { registrarUsuario } from '../../axios/UsuarioApi';
import MedicoExistenteSelect from './MedicoExistenteSelect';
import ConsultorioSelect from './ConsultorioSelect'; // Importa ConsultorioSelect aquí

// Agrega las interfaces necesarias para los datos
import { MedicoResponseDto } from '../../types/Medico';
import { ConsultorioResponseDto } from '../../types/Consultorio';

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [showMedicoOptions, setShowMedicoOptions] = useState<boolean>(false);
    const [isExistingMedico, setIsExistingMedico] = useState<boolean>(false);
    const [isNewMedico, setIsNewMedico] = useState<boolean>(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);
    const [selectedConsultorioId, setSelectedConsultorioId] = useState<number | undefined>(undefined);

    // Datos de ejemplo para médicos y consultorios
    const existingMedicos: MedicoResponseDto[] = [
        {
            id: 1, nombre: 'Juan', apellido: 'Pérez',
            telefono: '',
            email: '',
            dni: 0,
            cuil: '',
            fechaNacimiento: '',
            estaEliminado: false,
            especialidad: ''
        },
    ];

    const consultorios: ConsultorioResponseDto[] = [
        { id: 1, horarioAtencion: [], ubicacion: {
            ciudad: 'Ciudad A', provincia: 'Provincia A', calle: 'Calle A', altura: 123,
            id: 0,
            estaEliminado: false,
            codigo: ''
        }, estaEliminado: false, codigo: 'CONS001', medicoId: 1 },
        { id: 2, horarioAtencion: [], ubicacion: {
            ciudad: 'Ciudad B', provincia: 'Provincia B', calle: 'Calle B', altura: 456,
            id: 0,
            estaEliminado: false,
            codigo: ''
        }, estaEliminado: false, codigo: 'CONS002', medicoId: 2 },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ value: unknown }>
    ) => {
        const { name, value } = e.target as HTMLInputElement;
        setUsuarioData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "rol") {
            setShowMedicoOptions(value === UsuarioRolesEnum.ROL_MEDICO);
        }
    };

    const handleSelectExistingMedicoChange = (event: SelectChangeEvent<number>) => {
        setSelectedMedicoId(event.target.value as number);
    };

    const handleSelectConsultorioChange = (event: SelectChangeEvent<number>) => {
        setSelectedConsultorioId(event.target.value as number);
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

    return (
        <Card sx={{ m: 90,p: 5, maxWidth: 700, my: 5, fontFamily: 'Roboto', alignContent: 'center' }}>
            <CardHeader
                title="Registrar usuario"
                subheader="Complete los campos para registrar un nuevo usuario"
                sx={{ textAlign: 'center', mb: 2 }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Nombre de Usuario
                                </InputLabel>
                                <OutlinedInput
                                    name="username"
                                    type="text"
                                    value={usuarioData.username}
                                    onChange={handleChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    placeholder="Ingrese el nombre de usuario.."
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Contraseña
                                </InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type="password"
                                    value={usuarioData.password}
                                    onChange={handleChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    placeholder="Ingrese la contraseña.."
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    name="email"
                                    type="text"
                                    value={usuarioData.email}
                                    onChange={handleChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    placeholder="Ingrese el email.."
                                    fullWidth
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Rol
                                </InputLabel>
                                <Select
                                    name="rol"
                                    value={selectedRol}
                                    sx={{ my: 1, maxHeight: 40 }}
                                    onChange={(e) =>
                                        setSelectedRol(e.target.value as UsuarioRolesEnum)
                                    }>
                                    {Object.values(UsuarioRolesEnum).map((rol) => (
                                        <MenuItem key={rol} value={rol}>
                                            {rol.substring(4).toLowerCase()}{' '}
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
                                                onChange={(e) => setIsExistingMedico(e.target.checked)}
                                                name="isExistingMedico"
                                                color="primary"
                                            />
                                        }
                                        label="Médico Existente"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isNewMedico}
                                                onChange={(e) => setIsNewMedico(e.target.checked)}
                                                name="isNewMedico"
                                                color="primary"
                                            />
                                        }
                                        label="Crear Médico"
                                    />
                                </Grid>
                                {isExistingMedico && (
                                    <MedicoExistenteSelect
                                        existingMedicos={existingMedicos}
                                        selectedMedicoId={selectedMedicoId}
                                        handleSelectExistingMedicoChange={handleSelectExistingMedicoChange}
                                    />
                                )}
                                {isNewMedico && (
                                    <ConsultorioSelect
                                        consultorios={consultorios}
                                        selectedConsultorioId={selectedConsultorioId}
                                        handleSelectConsultorioChange={handleSelectConsultorioChange}
                                    />
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
                                <Typography color="primary">Usuario registrado con éxito</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ fontWeight: 'bold', fontSize: '14px' }}>
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
