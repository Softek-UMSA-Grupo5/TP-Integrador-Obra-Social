import React, { useEffect } from 'react';
import { Grid, Select, MenuItem } from '@mui/material';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { SelectChangeEvent } from '@mui/material/Select';
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
     useEffect(() => {
        if (!selectedConsultorioId && consultorios.length > 0) {
            handleSelectConsultorioChange({
                target: {
                    value: consultorios[0].id,
                },
            } as SelectChangeEvent<number>);
        }
    }, [consultorios, selectedConsultorioId, handleSelectConsultorioChange]);
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
