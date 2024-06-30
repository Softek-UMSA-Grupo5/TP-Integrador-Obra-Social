package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.recepcionista.dto.RecepcionistaRequestDto;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaUpdateRequestDto;
import org.softek.g5.validation.DataValidator;

public class RecepcionistaValidator {
	public static boolean validateRequestDto(RecepcionistaRequestDto dto) {
		return DataValidator.validateString(dto.getNombre(), 2, 20)
				&& DataValidator.validateString(dto.getApellido(), 2, 20)
				&& DataValidator.validateString(dto.getTelefono(), 10, 10)
				&& DataValidator.validateString(dto.getEmail(), 3, 254)
				&& DataValidator.validateInteger(dto.getDni(), 1, 99999999)
				&& DataValidator.validateString(dto.getCuil(), 11, 11)
				&& DataValidator.ValidateDate(dto.getFechaNacimiento());
	}
	
	public static boolean validateRequestDto(RecepcionistaUpdateRequestDto dto) {
		return DataValidator.validateLong(dto.getId(), 0L, Long.MAX_VALUE)
				&& DataValidator.validateString(dto.getNombre(), 2, 20)
				&& DataValidator.validateString(dto.getApellido(), 2, 20)
				&& DataValidator.validateString(dto.getTelefono(), 10, 10)
				&& DataValidator.validateString(dto.getEmail(), 3, 254)
				&& DataValidator.validateInteger(dto.getDni(), 1, 99999999)
				&& DataValidator.validateString(dto.getCuil(), 11, 11)
				&& DataValidator.ValidateDate(dto.getFechaNacimiento());
	}
}
