import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RecepcionistaResponseDto } from "../../assets/models/Recepcionista";
import { FormControl, Grid, MenuItem } from "@mui/material";
import { useEffect } from "react";

interface RecepcionistaSeleccionExistenteProps {
    existingRecepcionistas: RecepcionistaResponseDto[];
    selectedRecepcionistaId: number | undefined;
    handleSelectExistingRecepcionistaChange: (event: SelectChangeEvent<number>) => void;
}

const RecepcionistaExistenteSelect: React.FC<RecepcionistaSeleccionExistenteProps> = ({
    existingRecepcionistas,
    selectedRecepcionistaId,
    handleSelectExistingRecepcionistaChange,
}) => {
    useEffect(() => {
        if (!selectedRecepcionistaId && existingRecepcionistas.length > 0) {
            handleSelectExistingRecepcionistaChange({
                target: {
                    value: existingRecepcionistas[0].id,
                },
            } as SelectChangeEvent<number>);
        }
    }, [existingRecepcionistas, selectedRecepcionistaId, handleSelectExistingRecepcionistaChange]);
    return (
        <Grid item xs={12}>
            <div>
                <FormControl fullWidth variant='outlined' sx={{ my: 1.5 }}>
                    <Select
                        value={selectedRecepcionistaId ?? ''}
                        onChange={handleSelectExistingRecepcionistaChange}
                        fullWidth
                        variant="outlined"
                        sx={{ width: '100%' }}>
                        {existingRecepcionistas.map((recepcionista) => (
                            <MenuItem key={recepcionista.id} value={recepcionista.id}>
                                {`${recepcionista.nombre} ${recepcionista.apellido}, ${recepcionista.dni}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Grid>
    );
};

export default RecepcionistaExistenteSelect;