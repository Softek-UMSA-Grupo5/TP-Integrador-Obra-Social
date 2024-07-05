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
import { UsuarioRequestDto, UsuarioRolesEnum } from '../assets/models/Usuario';
import { registrarUsuario } from '../assets/axios/UsuarioApi';
import { SelectChangeEvent } from '@mui/material/Select';
import RecepcionistaForm from '../components/crearFuncionario/RecepcionistaForm';
import { RecepcionistaRequestDto } from '../assets/models/Recepcionista';
import { addRecepcionista } from '../assets/axios/RecepcionistaApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatearRol } from '../utils/formatearRol';
import UserInputForm from '../components/crearFuncionario/UserInputForm';

export default function UsuarioForm(): React.ReactElement {
    return (
        <Card sx={{ width: 700, mx: 'auto', my: 5 }}>
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
                <FuncionarioForm />
            </CardContent>
            <ToastContainer />
        </Card>
    );
}

const FuncionarioForm = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: '',
        rol: UsuarioRolesEnum.ROL_ADMIN,
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_ADMIN);
    const [isRecepcionista, setIsRecepcionista] = useState<boolean>(false);
    const allowedRoles = [UsuarioRolesEnum.ROL_ADMIN, UsuarioRolesEnum.ROL_RECEPCIONISTA];

    const [recepcionistaData, setRecepcionistaData] = useState<RecepcionistaRequestDto>({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: 0,
        fechaNacimiento: new Date(),
        cuil: '',
        usuarioId: 0,
    });

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
        setIsRecepcionista(value === UsuarioRolesEnum.ROL_RECEPCIONISTA);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registrarUsuario(usuarioData, selectedRol)
            .then((response) => {
                if (isRecepcionista) {
                    recepcionistaData.usuarioId = response.id;
                    console.log(recepcionistaData);
                    addRecepcionista(recepcionistaData);
                }
            })
            .then(() =>
                toast.success('Usuario registrado exitosamente', {
                    position: 'bottom-right',
                })
            )
            .catch(() =>
                toast.error('Error al registrar el Usuario o Fucnionario', {
                    position: 'bottom-right',
                })
            );
    };
    return (
        <>
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
                                        {formatearRol(rol)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {isRecepcionista && (
                        <>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <RecepcionistaForm
                                    recepcionistaData={recepcionistaData}
                                    setRecepcionistaData={setRecepcionistaData}
                                />
                            </Grid>
                        </>
                    )}
                    <UserInputForm
                        usuarioData={usuarioData}
                        handleUsuarioData={handleInputChange}
                    />
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
        </>
    );
};
