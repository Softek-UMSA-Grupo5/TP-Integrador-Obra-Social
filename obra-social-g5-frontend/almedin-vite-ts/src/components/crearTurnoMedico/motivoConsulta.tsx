import { FormControl, FormLabel, TextField } from '@mui/material';

interface Props {
    motivo: string;
    handleMotivo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MotivoConsulta({ motivo, handleMotivo }: Props) {
    return (
        <FormControl sx={{ width: '100%' }}>
            <FormLabel id="motivo-consulta-turno" className="label">
                Motivo de la consulta?
            </FormLabel>
            <TextField
                id="motivo-consulta"
                aria-labelledby="motivo-consulta-turno"
                multiline
                rows={6}
                fullWidth
                value={motivo}
                onChange={handleMotivo}
            />
        </FormControl>
    );
}

export default MotivoConsulta;
