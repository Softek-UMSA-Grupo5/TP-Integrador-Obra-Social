import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface Props {
    solicitante: string;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SolicitanteRadioGroup ({ solicitante, handleRadioChange }: Props) {
    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel id="solicitante-turno" className="label">
                Para quién es el turno médico?
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="solicitante-turno"
                value={solicitante}
                onChange={handleRadioChange}
                name="radio-buttons-group"
            >
                <FormControlLabel value="Para mí" control={<Radio />} label="Para mí" />
                <FormControlLabel
                    value="Para un beneficiario"
                    control={<Radio />}
                    label="Para un beneficiario"
                />
            </RadioGroup>
        </FormControl>
    );
}

export default SolicitanteRadioGroup;
