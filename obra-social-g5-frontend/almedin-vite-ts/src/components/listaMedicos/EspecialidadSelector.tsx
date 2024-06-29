import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function EspecialidadSelect() {
  const [especialidad, setEspecialidad] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setEspecialidad(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Especialidad</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={especialidad}
          label="Especialidad"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value={"traumatologia"}>Traumatología</MenuItem>
          <MenuItem value={"psicologia"}>Psicología</MenuItem>
          <MenuItem value={"pediatria"}>Pediatría</MenuItem>
          <MenuItem value={"cardiologia"}>Cardiología</MenuItem>
          <MenuItem value={"ginecologia"}>Ginecología</MenuItem>
          <MenuItem value={"dermatolgia"}>Dermatología</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}