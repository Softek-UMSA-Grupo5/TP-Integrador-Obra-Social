import React, { useState } from 'react';
import { Grid, Button, Card, CardContent, CardHeader, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { MedicoRequestDto } from '../../assets/models/Medico';
import { addMedico } from '../../assets/axios/MedicoApi';
import { registrarUsuario, getUserByUsername } from '../../assets/axios/UsuarioApi';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../assets/models/Usuario';
import MedicoForm from './MedicoForm';

const AgregarMedicoFormulario: React.FC = () => {
    const [medicoData, setMedicoData] = useState<MedicoRequestDto>({
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

    const [otherEmail, setOtherEmail] = useState<string>('');
    const [registerUser, setRegisterUser] = useState<boolean>(false);
    const [useMedicoEmail, setUseMedicoEmail] = useState<boolean>(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            let usuarioId: number | undefined = undefined;

            const usuarioDto: UsuarioRequestDto = {
                username: medicoData.dni.toString(),
                password: medicoData.dni.toString(),
                email: useMedicoEmail ? medicoData.email : otherEmail,
                rol: UsuarioRolesEnum.ROL_MEDICO,
            };

            await registrarUsuario(usuarioDto, UsuarioRolesEnum.ROL_MEDICO);

            // Obtener el ID del usuario recién creado
            const usuario = await getUserByUsername(usuarioDto.username);
            usuarioId = usuario.id;

            // Asignar usuarioId a medicoData
            medicoData.usuarioId = usuarioId;

            // Agregar el médico con los datos actualizados de medicoData
            await addMedico([medicoData]);

            toast.success('Médico creado exitosamente', {
                position: 'bottom-right',
            });
        } catch (error) {
            toast.error('Error al crear el médico', {
                position: 'bottom-right',
            });
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUseMedicoEmail(event.target.checked);
        if (event.target.checked) {
            setOtherEmail('');
        }
    };

    const handleOtherEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherEmail(event.target.value);
    };

    return (
        <Card sx={{ width: '100%', boxShadow: 0 }}>
            <CardHeader title="Agregar médico" sx={{ textAlign: 'center' }} />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <MedicoForm
                        medicoData={medicoData}
                        setMedicoData={setMedicoData}
                        setRegisterUser={setRegisterUser}
                        useMedicoEmail={useMedicoEmail}
                        setUseMedicoEmail={setUseMedicoEmail}
                        usuarioEmail={otherEmail}
                        setUsuarioEmail={setOtherEmail}
                        registerUser={registerUser}
                    />

                    {/* Checkbox y campo de otro email */}
                    <Grid container justifyContent="flex-start" spacing={2}>
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox checked={useMedicoEmail} onChange={handleCheckboxChange} name="useMedicoEmail" />}
                                label="Registrar usuario con email del médico?"
                            />
                        </Grid>
                        {!useMedicoEmail && (
                            <Grid item>
                                <TextField
                                    id="otherEmail"
                                    name="otherEmail"
                                    label="Email para registro"
                                    variant="outlined"
                                    value={otherEmail}
                                    onChange={handleOtherEmailChange}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid container justifyContent="center" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Agregar Médico
                        </Button>
                    </Grid>
                </form>
                <ToastContainer />
            </CardContent>
        </Card>
    );
};

export default AgregarMedicoFormulario;
