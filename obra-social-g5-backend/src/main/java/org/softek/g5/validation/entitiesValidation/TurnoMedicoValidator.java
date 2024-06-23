package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoCreateRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoUpdateRequestDto;
import org.softek.g5.validation.DataValidator;

public class TurnoMedicoValidator {

	public static boolean validateRequestDto(TurnoMedicoCreateRequestDto dto) {
		return DataValidator.validateDate(dto.getFecha())
				&& DataValidator.validateInteger(dto.getHora(), 0, 23)
				&& DataValidator.validateInteger(dto.getMinutos(), 0, 59)
				&& DataValidator.validateString(dto.getMotivoConsulta(), 1, 255);
	}
	
	public static boolean validateRequestDto(TurnoMedicoUpdateRequestDto dto) {
		return DataValidator.validateDate(dto.getFecha())
				&& DataValidator.validateInteger(dto.getHora(), 0, 23)
				&& DataValidator.validateInteger(dto.getMinutos(), 0, 59)
				&& DataValidator.validateString(dto.getMotivoConsulta(), 1, 255);
	}
	
}
