package org.softek.g5.entities.turnoMedico.dto;

import java.time.LocalDate;

import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TurnoMedicoResponseDto {

	private Long id;
	private String codigo;
	private LocalDate fecha;
	private int hora;
	private int minutos;
	private TurnoMedicoEstadoEnum estado;
	private String motivoConsulta;
	private Long recetaMedicaId;
	private Boolean estaDisponible;
	private Long medicoId;
	private Long socioId;
	
	
}
