import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function UbicacionSelect() {
  const [ubicacion, setUbicacion] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUbicacion(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Ubicación</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={ubicacion}
          label="Ubicación"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value={"rosario"}>Rosario, Santa Fe</MenuItem>
          <MenuItem value={"maipu"}>Maipú, Mendoza</MenuItem>
          <MenuItem value={"resistencia"}>Resistencia, Chaco</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}