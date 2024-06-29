import React from 'react';
import { Grid, Select, MenuItem } from '@mui/material';
import { MedicoResponseDto } from '../../types/Medico';

interface MedicoSeleccionExistenteProps {
    existingMedicos: MedicoResponseDto[];
    selectedMedicoId: number | undefined;
    handleSelectExistingMedicoChange: (event: React.ChangeEvent<{ value: number | undefined }>) => void;
}

const MedicoSeleccionExistente: React.FC<MedicoSeleccionExistenteProps> = ({
    existingMedicos,
    selectedMedicoId,
    handleSelectExistingMedicoChange,
}) => {
    return (
        <Grid item xs={12}>
            <div style={{ width: '70%', margin: 'auto' }}>
                <Select
                    value={selectedMedicoId}
                    onChange={handleSelectExistingMedicoChange}
                    fullWidth
                    variant="outlined"
                    sx={{ width: '100%' }}
                >
                    {existingMedicos.map((medico) => (
                        <MenuItem key={medico.id} value={medico.id}>
                            {`${medico.nombre} ${medico.apellido}`}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </Grid>
    );
};

export default MedicoSeleccionExistente;
