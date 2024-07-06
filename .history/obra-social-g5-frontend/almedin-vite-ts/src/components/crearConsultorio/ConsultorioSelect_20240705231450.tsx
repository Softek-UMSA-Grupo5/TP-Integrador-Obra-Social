import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import GenericSelect from '../crearUsuario/GenericSelect';

interface ConsultorioSelectProps {
    consultorios: ConsultorioResponseDto[];
    selectedConsultorioId: number | undefined;
    handleSelectConsultorioChange: (event: SelectChangeEvent<number>) => void;
}

const ConsultorioSelect: React.FC<ConsultorioSelectProps> = ({
    consultorios,
    selectedConsultorioId,
    handleSelectConsultorioChange,
}) => {
    return (
        <GenericSelect
            items={consultorios}
            selectedItem={selectedConsultorioId}
            handleSelectChange={handleSelectConsultorioChange}
            itemLabel={(consultorio) =>
                `${consultorio.ubicacion.provincia}, ${consultorio.ubicacion.ciudad}, ${consultorio.ubicacion.calle}, ${consultorio.ubicacion.altura}`
            }
            label="Seleccionar Consultorio"
        />
    );
};

export default ConsultorioSelect;
