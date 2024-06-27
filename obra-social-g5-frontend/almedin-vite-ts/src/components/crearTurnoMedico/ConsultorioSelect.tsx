import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Consultorio, Medico, Ubicacion } from '../../types';

interface Props {
    medicos: Medico[];
    consultorios: Consultorio[];
    selectedConsultorio: string;
    handleSelectedConsultorio: (event: SelectChangeEvent<string>) => void;
    selectedEspecialidad: string;
    ubicaciones: Ubicacion[];
}

function ConsultorioSelect({
    medicos,
    consultorios,
    selectedConsultorio,
    handleSelectedConsultorio,
    selectedEspecialidad,
    ubicaciones,
}: Props) {
    const ubicacionList = consultorios
        .filter((c) =>
            medicos
                .filter((m) => m.especialidad === selectedEspecialidad)
                .map((m) => m.id)
                .includes(c.medicoId)
        )
        .map((c) => c.ubicacion.id);
    const ubicacionSet = [...new Set(ubicacionList)];

    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel
                id="consultorio-turno"
                className={selectedEspecialidad !== '' ? 'label' : 'label-disabled'}>
                Consultorio
            </FormLabel>
            <Select
                labelId="consultorio-turno"
                id="consultorio"
                value={selectedConsultorio}
                onChange={handleSelectedConsultorio}
                fullWidth
                disabled={selectedEspecialidad === ''}>
                {ubicaciones
                    .filter((u) => ubicacionSet.includes(u.id))
                    .map((u) => (
                        <MenuItem key={u.id} value={u.id}>
                            {Object.values(u).join(', ')}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

export default ConsultorioSelect;
