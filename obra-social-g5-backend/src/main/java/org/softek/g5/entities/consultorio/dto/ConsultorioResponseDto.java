package org.softek.g5.entities.consultorio.dto;

import java.util.List;

import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConsultorioResponseDto {
    private List<HorarioResponseDto> horarioAtencion;
    private UbicacionResponseDto ubicacion;
    private boolean estaEliminado;
    private String codigo;
    private Long medicoId;
}