import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  especialidad: string;
  handleSetEspecialidad: (event: SelectChangeEvent<string>) => void;
}

export default function EspecialidadSelect({ especialidad, handleSetEspecialidad }: props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Especialidad</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={especialidad}
          name='especialidad'
          label="Especialidad"
          onChange={handleSetEspecialidad}
        >
          <MenuItem value={"General"}>General</MenuItem>
          <MenuItem value={"Traumatólogo"}>Traumatología</MenuItem>
          <MenuItem value={"Oftalmólogo"}>Oftalmología</MenuItem>
          <MenuItem value={"Pediatra"}>Pediatría</MenuItem>
          <MenuItem value={"Cardiólogo"}>Cardiología</MenuItem>
          <MenuItem value={"Ginecólogo"}>Ginecología</MenuItem>
          <MenuItem value={"Dermatólogo"}>Dermatología</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}