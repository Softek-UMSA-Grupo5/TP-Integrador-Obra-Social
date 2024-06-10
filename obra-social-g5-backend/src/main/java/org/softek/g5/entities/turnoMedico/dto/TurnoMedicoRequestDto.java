package org.softek.g5.entities.turnoMedico.dto;

import java.time.LocalDate;

import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;

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
public class TurnoMedicoRequestDto {

	@NotNull
	private LocalDate fecha;
	@NotNull
	private int hora;
	@NotNull
	private int minutos;
	private TurnoMedicoEstadoEnum estado;
	@NotNull
	private String motivoConsulta;
	private RecetaMedicaRequestDto recetaMedica;
	@NotNull
	private MedicoRequestDto medico;
	@NotNull
	private SocioRequestDto socio;
	
}
