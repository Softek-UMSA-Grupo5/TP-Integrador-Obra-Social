package org.softek.g5.entities.horario.dto;

import java.time.LocalTime;

import org.softek.g5.entities.horario.HorarioDiaSemanaEnum;

public interface HorarioDto {

	HorarioDiaSemanaEnum getDiaSemana();
	LocalTime getHoraInicio();
	LocalTime getHoraFin();
	
}
