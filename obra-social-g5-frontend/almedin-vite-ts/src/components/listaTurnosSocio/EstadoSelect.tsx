import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { TurnoMedicoEstadoEnum } from '../../assets/models/TurnoMedico';

interface props {
    estado: TurnoMedicoEstadoEnum;
    handleSetEstado: (event: SelectChangeEvent<TurnoMedicoEstadoEnum>) => void;
}

export default function EstadoSelect({ estado, handleSetEstado }: props) {
    return (
        <FormControl sx={{ m: 1, minWidth: 120, paddingBottom: '1.8rem' }}>
            <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={estado}
                label="Estado"
                onChange={handleSetEstado}>
                <MenuItem value={TurnoMedicoEstadoEnum.PENDIENTE}>Pendiente</MenuItem>
                <MenuItem value={TurnoMedicoEstadoEnum.COMPLETADA}>Completado</MenuItem>
                <MenuItem value={TurnoMedicoEstadoEnum.CANCELADA}>Cancelado</MenuItem>
            </Select>
        </FormControl>
    );
}
