import React from 'react';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { SelectChangeEvent } from '@mui/material/Select';
import GenericSelect from '../crearUsuario/GenericSelect';

interface MedicoSeleccionExistenteProps {
    existingMedicos: MedicoResponseDto[];
    selectedMedicoId: number | undefined;
    handleSelectExistingMedicoChange: (event: SelectChangeEvent<number>) => void;
}

const MedicoExistenteSelect: React.FC<MedicoSeleccionExistenteProps> = ({
    existingMedicos,
    selectedMedicoId,
    handleSelectExistingMedicoChange,
}) => {
  return (
        <GenericSelect
            items={existingMedicos}
            selectedItem={selectedMedicoId}
            handleSelectChange={handleSelectExistingMedicoChange}
            itemLabel={(medico) =>
                `${medico.nombre} ${medico.apellido}, ${medico.dni}, ${medico.especialidad}`
            }
            label="Seleccionar Medico"
        />
    ); 
};

export default MedicoExistenteSelect;