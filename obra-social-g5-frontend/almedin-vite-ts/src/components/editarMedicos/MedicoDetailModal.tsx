import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { toast } from 'react-toastify';
import ConsultorioSelect from '../crearConsultorio/ConsultorioSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import { deleteMedico, updateMedico } from '../../assets/axios/MedicoApi';

interface MedicoDetailModalProps {
    open: boolean;
    medico: MedicoResponseDto;
    onClose: () => void;
    onDelete: () => void;
    onEdit: (medicoData: MedicoResponseDto) => void;
    consultoriosData: ConsultorioResponseDto[];
}

const MedicoDetailModal: React.FC<MedicoDetailModalProps> = ({
    open,
    medico,
    onClose,
    onDelete,
    onEdit,
    consultoriosData,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedMedico, setEditedMedico] = useState<MedicoResponseDto>({ ...medico });

    const handleEditClick = () => {
        setEditMode(true);
        toast.info('Editar médico');
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedMedico({ ...medico });
    };

    const handleSaveEdit = async () => {
        try {
            const updatedMedico = await updateMedico(editedMedico.id, editedMedico);
            onEdit(updatedMedico);
            setEditMode(false);
            toast.success('Médico actualizado');
        } catch (error) {
            toast.error('Error al actualizar el médico');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMedico(editedMedico.id);
            onDelete();
            toast.success('Médico eliminado');
        } catch (error) {
            toast.error('Error al eliminar el médico');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedMedico((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSelectConsultorioChange = (event: SelectChangeEvent<number>) => {
        const consultorioId = Number(event.target.value);
        setEditedMedico((prevState) => ({
            ...prevState,
            consultoriosId: [consultorioId],
        }));
    };

    const { nombre, apellido, especialidad, email, telefono, dni, fechaNacimiento, cuil, id } =
        editedMedico;

    const associatedConsultorios = consultoriosData.filter(
        (consultorio) => consultorio.medicoId === id
    );

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800, // Ajusta el ancho máximo según tus necesidades
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '90vh', 
                    overflowY: 'auto', 
                }}>
                <Typography variant="h6">
                    {editMode ? (
                        <TextField
                            name="nombre"
                            label="Nombre"
                            sx={{ my: 1.5, maxHeight: 40, xs: 6 }}
                            value={editedMedico.nombre}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `${nombre}`
                    )}
                </Typography>
                <Typography variant="h6">
                    {editMode ? (
                        <TextField
                            name="apellido"
                            label="Apellido"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.apellido}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `${apellido}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="especialidad"
                            label="Especialidad"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.especialidad}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `Especialidad: ${especialidad}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="email"
                            label="Email"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.email}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `Email: ${email}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="telefono"
                            label="Teléfono"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.telefono}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `Teléfono: ${telefono}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="dni"
                            label="Número de documento"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.dni}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `DNI: ${dni}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="fechaNacimiento"
                            label="Fecha de Nacimiento"
                            type="date"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.fechaNacimiento}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `Fecha de Nacimiento: ${fechaNacimiento}`
                    )}
                </Typography>
                <Typography variant="body1">
                    {editMode ? (
                        <TextField
                            name="cuil"
                            label="CUIL/T"
                            sx={{ my: 1.5, maxHeight: 40 }}
                            value={editedMedico.cuil}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        `CUIL: ${cuil}`
                    )}
                </Typography>
                <Typography variant="body1">Consultorios:</Typography>
                {associatedConsultorios.length > 0 ? (
                    associatedConsultorios.map((consultorio) => (
                        <Box key={consultorio.id} sx={{ ml: 2, mb: 2 }}>
                            <Typography variant="body1">
                                {editMode ? (
                                    <TextField
                                        name={`ubicacion.calle_${consultorio.id}`}
                                        label="Calle"
                                        sx={{ my: 1.5, maxHeight: 40 }}
                                        value={consultorio.ubicacion.calle}
                                        disabled={!editMode}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                ) : (
                                    `Calle: ${consultorio.ubicacion.calle}`
                                )}
                            </Typography>
                            <Typography variant="body1">
                                {editMode ? (
                                    <TextField
                                        name={`ubicacion.altura_${consultorio.id}`}
                                        label="Altura"
                                        sx={{ my: 1.5, maxHeight: 40 }}
                                        value={consultorio.ubicacion.altura}
                                        disabled={!editMode}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                ) : (
                                    `Altura: ${consultorio.ubicacion.altura}`
                                )}
                            </Typography>
                            <Typography variant="body1">
                                {editMode ? (
                                    <TextField
                                        name={`ubicacion.ciudad_${consultorio.id}`}
                                        label="Ciudad"
                                        sx={{ my: 1.5, maxHeight: 40 }}
                                        value={consultorio.ubicacion.ciudad}
                                        disabled={!editMode}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                ) : (
                                    `Ciudad: ${consultorio.ubicacion.ciudad}`
                                )}
                            </Typography>
                            <Typography variant="body1">
                                {editMode ? (
                                    <TextField
                                        name={`ubicacion.provincia_${consultorio.id}`}
                                        label="Provincia"
                                        sx={{ my: 1.5, maxHeight: 40 }}
                                        value={consultorio.ubicacion.provincia}
                                        disabled={!editMode}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                ) : (
                                    `Provincia: ${consultorio.ubicacion.provincia}`
                                )}
                            </Typography>
                            <Typography variant="body2">Horarios de Atención:</Typography>
                            {consultorio.horarioAtencion.map((horario) => (
                                <div key={horario.id}>
                                    <Typography variant="body1">
                                        {editMode ? (
                                            <TextField
                                                name={`horarioAtencion.diaSemana_${horario.id}`}
                                                label="Día de semana"
                                                sx={{ my: 1.5, maxHeight: 40 }}
                                                value={horario.diaSemana}
                                                disabled={!editMode}
                                                onChange={handleInputChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            `Día de semana: ${horario.diaSemana}`
                                        )}
                                    </Typography>
                                    <Typography variant="body1">
                                        {editMode ? (
                                            <TextField
                                                name={`horarioAtencion.horaInicio_${horario.id}`}
                                                label="Horario de Inicio"
                                                sx={{ my: 1.5, maxHeight: 40 }}
                                                value={horario.horaInicio}
                                                disabled={!editMode}
                                                onChange={handleInputChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            `Horario de Inicio: ${horario.horaInicio}`
                                        )}
                                    </Typography>
                                    <Typography variant="body1">
                                        {editMode ? (
                                            <TextField
                                                name={`horarioAtencion.horaFin_${horario.id}`}
                                                label="Horario de Finalización"
                                                sx={{ my: 1.5, maxHeight: 40 }}
                                                value={horario.horaFin}
                                                disabled={!editMode}
                                                onChange={handleInputChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            `Horario de Finalización: ${horario.horaFin}`
                                        )}
                                    </Typography>
                                </div>
                            ))}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">No hay consultorios asignados</Typography>
                )}
                {editMode && (
                    <ConsultorioSelect
                        consultorios={consultoriosData}
                        selectedConsultorioId={
                            editedMedico.consultoriosId ? editedMedico.consultoriosId[0] : undefined
                        }
                        handleSelectConsultorioChange={handleSelectConsultorioChange}
                    />
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    {!editMode && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditClick}
                            sx={{ mr: 2 }}>
                            Editar
                        </Button>
                    )}
                    {editMode && (
                        <>
                            <Button variant="contained" onClick={handleCancelEdit} sx={{ mr: 2 }}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                                Guardar
                            </Button>
                        </>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ ml: 2 }}>
                        Eliminar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default MedicoDetailModal;
