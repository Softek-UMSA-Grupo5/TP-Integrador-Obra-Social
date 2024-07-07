import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useUser } from '../../assets/contexts/UserContext';
import { BeneficiarioResponse } from '../../assets/models/Beneficiario';

interface Props {
    solicitante: string;
    selectedBeneficiario: string;
    handleSelectedBeneficiario: (event: SelectChangeEvent<string>) => void;
}

function BeneficiariosSelect({
    solicitante,
    selectedBeneficiario,
    handleSelectedBeneficiario,
}: Props) {
    const { user } = useUser();
    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel
                id="beneficiarios-turno"
                className={solicitante === 'Para un beneficiario' ? 'label' : 'label-disabled'}>
                Beneficiarios
            </FormLabel>
            <Select
                labelId="beneficiarios-turno"
                id="beneficiarios"
                value={selectedBeneficiario}
                onChange={handleSelectedBeneficiario}
                disabled={solicitante !== 'Para un beneficiario'}
                fullWidth>
                {user?.userData.beneficiarios.map((beneficiario: BeneficiarioResponse) => (
                    <MenuItem key={beneficiario.dni} value={beneficiario.dni}>
                        {beneficiario.apellido.concat(
                            ' ',
                            beneficiario.nombre,
                            ', ',
                            String(beneficiario.dni)
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default BeneficiariosSelect;
