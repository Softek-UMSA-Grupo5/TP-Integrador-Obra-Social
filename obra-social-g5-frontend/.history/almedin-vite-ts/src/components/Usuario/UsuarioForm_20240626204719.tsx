import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Grid,
    Checkbox,
    FormGroup,
    Button,
} from '@mui/material';
import { Medico } from '../../types/Medico';
import { MedicoNuevoForm } from '../Components/Consultorio/MedicoNuevoForm';
import ConsultorioSelect from './ConsultorioSelect';
import { Consultorio } from '../../types/Consultorio';
import { UsuarioRolesEnum } from '../../enums/UsuarioRolesEnum';
import { UsuarioRequestDto } from '../../types/UsuarioRequestDto';
import { registrarUsuario } from '../../api/usuarios';

interface UsuarioFormProps {
    consultorios: Consultorio[];
    existingMedicos: Medico[];
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ consultorios, existingMedicos }) => {
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum | null>(null);
    const [isNewMedico, setIsNewMedico] = useState(false);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | null>(null);
    const [selectedConsultorioId, setSelectedConsultorioId] = useState<number | null>(null);

    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        // Aquí define los campos iniciales del usuario
        nombre: '',
        apellido: '',
        // Otros campos necesarios
        rol: null, // Esto se actualizará dinámicamente
    });

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRol(event.target.value as UsuarioRolesEnum);
        setIsNewMedico(false); // Resetear isNewMedico cuando cambia el rol
        setSelectedMedicoId(null); // Resetear selectedMedicoId cuando cambia el rol
        setSelectedConsultorioId(null); // Resetear selectedConsultorioId cuando cambia el rol
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNewMedico(event.target.checked);
    };

    const handleMedicoSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedMedicoId(event.target.value as number);
    };

    const handleConsultorioSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedConsultorioId(event.target.value as number);
    };

    const handleMedicoDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUsuarioData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = isNewMedico ? { ...usuarioData, rol: selectedRol, ...medicoData } : { ...usuarioData, rol: selectedRol };
            await registrarUsuario(dataToSend, selectedRol);
            // Manejar éxito
        } catch (error) {
            // Manejar error
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Seleccionar Rol</FormLabel>
                    <RadioGroup aria-label="rol" name="rol" value={selectedRol} onChange={handleRadioChange}>
                        <FormControlLabel value={UsuarioRolesEnum.Medico} control={<Radio />} label="Médico" />
                        {/* Otros roles */}
                    </RadioGroup>
                </FormControl>
            </Grid>

            {selectedRol === UsuarioRolesEnum.Medico && (
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={isNewMedico} onChange={handleCheckboxChange} />}
                            label="Crear nuevo médico"
                        />
                    </FormGroup>
                </Grid>
            )}

            {selectedRol === UsuarioRolesEnum.Medico && isNewMedico && (
                <Grid item xs={12}>
                    <MedicoNuevoForm medicoData={medicoData} handleMedicoDataChange={handleMedicoDataChange} />
                </Grid>
            )}

            {selectedRol === UsuarioRolesEnum.Medico && !isNewMedico && (
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel component="legend">Seleccionar Médico Existente</FormLabel>
                        <RadioGroup
                            aria-label="medico-existente"
                            name="medico-existente"
                            value={selectedMedicoId}
                            onChange={handleMedicoSelectChange}
                        >
                            {existingMedicos.map((medico) => (
                                <FormControlLabel
                                    key={medico.id}
                                    value={medico.id}
                                    control={<Radio />}
                                    label={`${medico.nombre} ${medico.apellido}`}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">Seleccionar Consultorio</FormLabel>
                        <ConsultorioSelect
                            consultorios={consultorios}
                            selectedConsultorioId={selectedConsultorioId}
                            handleSelectConsultorioChange={handleConsultorioSelectChange}
                        />
                    </FormControl>
                </Grid>
            )}

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Registrar Usuario
                </Button>
            </Grid>
        </Grid>
    );
};

export default UsuarioForm;
