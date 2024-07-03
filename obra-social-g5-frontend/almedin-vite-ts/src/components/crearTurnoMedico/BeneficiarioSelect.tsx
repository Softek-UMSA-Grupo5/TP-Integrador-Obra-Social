import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Socio } from '../../types';

interface Props {
    solicitante: string;
    socio: Socio | undefined;
    selectedBeneficiario: string;
    handleSelectedBeneficiario: (event: SelectChangeEvent<string>) => void;
}

function BeneficiariosSelect({ solicitante, socio, selectedBeneficiario, handleSelectedBeneficiario }: Props) {
    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel
                id="beneficiarios-turno"
                className={solicitante === 'Para un beneficiario' ? 'label' : 'label-disabled'}
            >
                Beneficiarios
            </FormLabel>
            <Select
                labelId="beneficiarios-turno"
                id="beneficiarios"
                value={selectedBeneficiario}
                onChange={handleSelectedBeneficiario}
                disabled={solicitante !== 'Para un beneficiario'}
                fullWidth
            >
                {socio?.beneficiarios && socio.beneficiarios.map((beneficiario) => (
                    <MenuItem key={beneficiario.dni} value={beneficiario.dni}>
                        {beneficiario.apellido.concat(' ', beneficiario.nombre, ', ', String(beneficiario.dni))}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default BeneficiariosSelect;
