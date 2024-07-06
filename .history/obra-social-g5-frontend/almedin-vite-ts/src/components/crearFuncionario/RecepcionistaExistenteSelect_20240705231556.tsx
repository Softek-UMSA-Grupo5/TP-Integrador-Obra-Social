import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { RecepcionistaResponseDto } from '../../assets/models/Recepcionista';
import GenericSelect from '../crearUsuario/GenericSelect';

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
    return (
        <GenericSelect
            items={existingRecepcionistas}
            selectedItem={selectedRecepcionistaId}
            handleSelectChange={handleSelectExistingRecepcionistaChange}
            itemLabel={(recepcionista) => `${recepcionista.nombre} ${recepcionista.apellido}, ${recepcionista.dni}`}
            label="Seleccionar Recepcionista"
        />
    );
};

export default RecepcionistaExistenteSelect;
