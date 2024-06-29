import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function EstadoSelect() {
  const [estado, setEstado] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, paddingBottom:"1.8rem" }}>
      <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={estado}
        label="Estado"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Todos</em>
        </MenuItem>
        <MenuItem value="completado">Completado</MenuItem>
        <MenuItem value="pendiente">Pendiente</MenuItem>
      </Select>
    </FormControl>
  );
}