import React, { useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl } from '@mui/material';
import { MedicoResponseDto } from '../../assets/models/Medico';
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
    useEffect(() => {
        if (!selectedMedicoId && existingMedicos.length > 0) {
            handleSelectExistingMedicoChange({
                target: {
                    value: existingMedicos[0].id,
                },
            } as SelectChangeEvent<number>);
        }
    }, [existingMedicos, selectedMedicoId, handleSelectExistingMedicoChange]);
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
                        {existingMedicos.map((medico) => (
                            <MenuItem key={medico.id} value={medico.id}>
                                {`${medico.nombre} ${medico.apellido}, ${medico.dni} , ${medico.especialidad}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Grid>
    );
};

export default MedicoExistenteSelect;