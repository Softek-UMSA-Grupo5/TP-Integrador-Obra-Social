import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Consultorio, Medico } from '../../types';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { MedicoResponseDto } from '../../assets/models/Medico';

interface Props {
    medicos: MedicoResponseDto[];
    consultorios: ConsultorioResponseDto[];
    selectedMedico: string;
    handleSelectedMedico: (event: SelectChangeEvent<string>) => void;
    selectedConsultorio: string;
}

function MedicoSelect({ medicos, consultorios, selectedMedico, handleSelectedMedico, selectedConsultorio }: Props) {
    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel
                id="medico-turno"
                className={selectedConsultorio !== '' ? 'label' : 'label-disabled'}
            >
                Medico
            </FormLabel>
            <Select
                labelId="medico-turno"
                id="medico"
                value={selectedMedico}
                onChange={handleSelectedMedico}
                fullWidth
                disabled={selectedConsultorio === ''}
            >
                {medicos
                    .filter((medico) =>
                        consultorios
                            .filter((c) => c.ubicacion.id === +selectedConsultorio)
                            .map((c) => c.medicoId)
                            .includes(medico.id)
                    )
                    .map((medico) => (
                        <MenuItem key={medico.id} value={medico.id}>
                            {medico.nombre + ' ' + medico.apellido}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

export default MedicoSelect;
