package org.softek.g5.entities.consultorio.dto;

import java.util.List;

import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;

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
public class ConsultorioRequestDto {
	 private List<HorarioRequestDto> horarioAtencion;
	 private UbicacionRequestDto ubicacion;
	 private MedicoRequestDto medico;
	 private String codigo;
}
