package org.softek.g5.entities.turnoMedico.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
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
public class TurnoMedicoCreateRequestDto {

	@NotNull
	private LocalDate fecha;
	@NotNull
	private int hora;
	@NotNull
	private int minutos;
	@NotNull
	private String motivoConsulta;
	@NotNull
	private Long medicoId;
	@NotNull
	private Long socioId;
	
}
