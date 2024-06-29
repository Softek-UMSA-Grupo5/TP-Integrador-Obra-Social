import React from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MedicoResponseDto } from '../../models/Medico';
import { SelectChangeEvent } from '@mui/material/Select';

interface MedicoSeleccionExistenteProps {
    existingMedicos: MedicoResponseDto[];
    selectedMedicoId: number | undefined;
    handleSelectExistingMedicoChange: (event: SelectChangeEvent<number>) => void;
}

const MedicoExistenteSelect: React.FC<MedicoSeleccionExistenteProps> = ({
    existingMedicos,
    selectedMedicoId,
    handleSelectExistingMedicoChange,
}) => {
    return (
        <Grid item xs={12}>
            <div>
                <FormControl fullWidth variant='outlined'>
                    <InputLabel sx={{  fontSize: '14px', mb: 2 }}>Médicos</InputLabel>
                    <Select
                        value={selectedMedicoId ?? ''}
                        onChange={handleSelectExistingMedicoChange}
                        fullWidth
                        variant="outlined"
                        sx={{ width: '100%' }}>
                        {existingMedicos.map((medico) => (
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
