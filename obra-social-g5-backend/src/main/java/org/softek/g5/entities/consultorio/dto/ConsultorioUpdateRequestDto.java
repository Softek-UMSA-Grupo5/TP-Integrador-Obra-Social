package org.softek.g5.entities.consultorio.dto;

import java.util.List;

import org.softek.g5.entities.horario.dto.HorarioUpdateRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionUpdateRequestDto;

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
public class ConsultorioUpdateRequestDto {

	private Long id;
	private List<HorarioUpdateRequestDto> horarioAtencion;
	private UbicacionUpdateRequestDto ubicacion;
	private Long medicoId;
	private String codigo;

}
