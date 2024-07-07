import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';
import { MedicoResponseDto } from '../../assets/models/Medico';
import React from 'react';
import { getUbicaciones } from '../../assets/axios/UbicacionApi';
import { UbicacionResponseDto } from '../../assets/models/Ubicacion';

interface Props {
    medicos: MedicoResponseDto[];
    consultorios: ConsultorioResponseDto[];
    selectedConsultorio: string;
    handleSelectedConsultorio: (event: SelectChangeEvent<string>) => void;
    selectedEspecialidad: string;
}

function ConsultorioSelect({
    medicos,
    consultorios,
    selectedConsultorio,
    handleSelectedConsultorio,
    selectedEspecialidad,
}: Props) {
    const [ubicaciones, setUbicaciones] = React.useState<UbicacionResponseDto[]>([]);

    React.useEffect(() => {
        getUbicaciones().then((response) => setUbicaciones(response));
    }, []);

    const ubicacionList = consultorios
        .filter((c) =>
            medicos
                .filter((m) => m.especialidad === selectedEspecialidad)
                .map((m) => m.id)
                .includes(c.medicoId)
        )
        .map((c) => c.ubicacion.id);
    const ubicacionSet = [...new Set(ubicacionList)];

    return (
        <FormControl sx={{ mt: 3, width: '100%' }}>
            <FormLabel
                id="consultorio-turno"
                className={selectedEspecialidad !== '' ? 'label' : 'label-disabled'}>
                Consultorio
            </FormLabel>
            <Select
                labelId="consultorio-turno"
                id="consultorio"
                value={selectedConsultorio}
                onChange={handleSelectedConsultorio}
                fullWidth
                disabled={selectedEspecialidad === ''}>
                {ubicaciones.length !== 0 ? (
                    ubicaciones
                        .filter((u) => ubicacionSet.includes(u.id))
                        .map((u) => (
                            <MenuItem key={u.id} value={u.id}>
                                {u.calle + ' ' + u.altura + ', ' + u.ciudad + ', ' + u.provincia}
                            </MenuItem>
                        ))
                ) : (
                    <MenuItem>Cargando...</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default ConsultorioSelect;
