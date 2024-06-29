import React from 'react';
import { Grid, Select, MenuItem } from '@mui/material';
import { ConsultorioResponseDto } from '../../models/Consultorio';
import { SelectChangeEvent } from '@mui/material/Select';

interface ConsultorioSelectProps {
    consultorios: ConsultorioResponseDto[];
    selectedConsultorioId: number | undefined;
    handleSelectConsultorioChange: (event: SelectChangeEvent<number>) => void;
}

const ConsultorioSelect: React.FC<ConsultorioSelectProps> = ({
    consultorios,
    selectedConsultorioId,
    handleSelectConsultorioChange,
}) => {
     useEffect(() => {
        if (!selectedConsultorioId && consultorios.length > 0) {
            handleSelectConsultorioChange({
                target: {
                    value: consultorios[0].id,
                },
            } as SelectChangeEvent<number>);
        }
    }, [consultorios, selectedConsultorioId, handleSelectConsultorioChange]);
    return (
        <Grid item xs={12}>
            <div>
                <Select
                    value={selectedConsultorioId ?? ''}
                    onChange={handleSelectConsultorioChange}
                    fullWidth
                    variant="outlined"
                    sx={{ width: '100%' }}
                >
                    {consultorios.map((consultorio) => (
                        <MenuItem key={consultorio.id} value={consultorio.id}>
                            {`${consultorio.ubicacion.ciudad}, ${consultorio.ubicacion.calle}`}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </Grid>
    );
};

export default ConsultorioSelect;
