import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl } from '@mui/material';
import { MedicoResponseDto } from '../../models/Medico';
import { SelectChangeEvent } from '@mui/material/Select';
import { getAllMedicos } from '../../axios/MedicoApi'; // Ajusta la importación según tu estructura

interface MedicoExistenteSelectProps {
    handleSelectExistingMedicoChange: (event: SelectChangeEvent<number>) => void;
}

const MedicoExistenteSelect: React.FC<MedicoExistenteSelectProps> = ({
    handleSelectExistingMedicoChange,
}) => {
    const [medicos, setMedicos] = useState<MedicoResponseDto[]>([]);
    const [selectedMedicoId, setSelectedMedicoId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const medicosData = await getAllMedicos();
                setMedicos(medicosData);
                // Puedes establecer aquí el primer médico como seleccionado por defecto
                setSelectedMedicoId(medicosData.length > 0 ? medicosData[0].id : undefined);
            } catch (error) {
                console.error('Error al obtener los médicos:', error);
            }
        };

        fetchMedicos();
    }, []); // Se ejecuta solo al montar el componente

    return (
        <Grid item xs={12}>
            <div>
                <FormControl fullWidth variant='outlined' sx={{ my: 1.5 }}>
                    <Select
                        value={selectedMedicoId ?? ''}
                        onChange={handleSelectExistingMedicoChange}
                        fullWidth
                        variant="outlined"
                        sx={{ width: '100%' }}>
                        {medicos.map((medico) => (
                            <MenuItem key={medico.id} value={medico.id}>
                                {`${medico.nombre} ${medico.apellido}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Grid>
    );
};

export default MedicoExistenteSelect;
