import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Medico } from '../../types';

interface Props {
    medicos: Medico[];
    handleSelectedEspecialidad: (event: SelectChangeEvent<string>) => void;
    selectedEspecialidad: string;
}

function EspecialidadSelect({ medicos, selectedEspecialidad, handleSelectedEspecialidad }: Props) {
    const especialidadesList = medicos.map((medico) => medico.especialidad);
    const especialidadesSet = [...new Set(especialidadesList)];
    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel id="especialidad-turno" className="label">
                Especialidad
            </FormLabel>
            <Select
                labelId="especialidad-turno"
                id="especialidad"
                value={selectedEspecialidad}
                onChange={handleSelectedEspecialidad}
                fullWidth
            >
                {especialidadesSet.map((especialidad, index) => (
                    <MenuItem key={index} value={especialidad}>
                        {especialidad}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default EspecialidadSelect;
