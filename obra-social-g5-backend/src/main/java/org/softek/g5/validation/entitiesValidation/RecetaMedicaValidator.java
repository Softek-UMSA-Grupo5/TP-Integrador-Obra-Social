package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.validation.DataValidator;

public class RecetaMedicaValidator {

	public static boolean validateRequestDto(RecetaMedicaRequestDto dto) {
		return DataValidator.validateInteger(dto.getCantDiasVigencia(), 1, 100);
	}
	
}
