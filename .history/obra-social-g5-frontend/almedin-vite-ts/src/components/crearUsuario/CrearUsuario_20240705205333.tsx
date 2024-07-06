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
    Box,
} from '@mui/material';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../assets/models/Usuario';
import { registrarUsuario, getUserByUsername } from '../../assets/axios/UsuarioApi';
import { SelectChangeEvent } from '@mui/material/Select';
import RecepcionistaForm from './CrearRecepcionista';
import { RecepcionistaRequestDto } from '../../assets/models/Recepcionista';
import { addRecepcionista } from '../../assets/axios/RecepcionistaApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatRol = (rol: UsuarioRolesEnum) => rol.replace('ROL_', '').toLowerCase();
const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
        rol: UsuarioRolesEnum.ROL_ADMIN,
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_ADMIN);
    const [isExistingRecepcionista] = useState<boolean>(false);
    const [isNewRecepcionista, setIsNewRecepcionista] = useState<boolean>(false);

    const [recepcionistaData, setRecepcionistaData] = useState<RecepcionistaRequestDto>({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        fechaNacimiento: new Date(),
        cuil: '',
        usuarioId: 0,
    });

    const [showRecepcionistaOptions, setShowRecepcionistaOptions] = useState<boolean>(false);

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
        const isRecepcionista = value === UsuarioRolesEnum.ROL_RECEPCIONISTA;
        setShowRecepcionistaOptions(isRecepcionista);

        if (!isRecepcionista) {
            setIsNewRecepcionista(false);
        } else {
            setIsNewRecepcionista(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            usuarioData.rol = isExistingRecepcionista
                ? UsuarioRolesEnum.ROL_RECEPCIONISTA
                : selectedRol;
            await registrarUsuario(usuarioData, usuarioData.rol);

            const usuarioResponse = await getUserByUsername(usuarioData.username);
            const usuarioId = usuarioResponse.id;

            if (isNewRecepcionista && showRecepcionistaOptions) {
                const recepcionistaNuevo = {
                    ...recepcionistaData,
                    usuarioId,
                };
                await addRecepcionista(recepcionistaNuevo);
            }

            toast.success('Usuario registrado exitosamente', {
                position: 'bottom-right',
            });
        } catch (error) {
            toast.error('Error al registrar el Usuario o Fucnionario', {
                position: 'bottom-right',
            });
        }
    };
    const allowedRoles = [UsuarioRolesEnum.ROL_ADMIN, UsuarioRolesEnum.ROL_RECEPCIONISTA];

    return (
        <Card style={{ width: '100%', boxShadow: 'none' }}>
            <CardHeader
                title={
                    <Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                                Agregar Funcionario
                            </Typography>
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} p={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel sx={{ fontSize: '16px' }}>Rol del funcionario</InputLabel>
                                <Select
                                    value={selectedRol}
                                    onChange={handleSelectChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    input={<OutlinedInput />}>
                                    {allowedRoles.map((rol) => (
                                        <MenuItem key={rol} value={rol}>
                                            {formatRol(rol)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {showRecepcionistaOptions && (
                            <>
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <RecepcionistaForm
                                        recepcionistaData={recepcionistaData}
                                        setRecepcionistaData={setRecepcionistaData}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Nombre de Usuario</InputLabel>
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
                                <InputLabel>Constraseña</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type="password"
                                    placeholder="Constraseña"
                                    value={usuarioData.password}
                                    onChange={handleInputChange}
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    required
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
                                    sx={{ my: 1.5, maxHeight: 40 }}
                                    placeholder="Email"
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ width: 300 }}>
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <ToastContainer />
            </CardContent>
        </Card>
    );
};

export default UsuarioForm;
