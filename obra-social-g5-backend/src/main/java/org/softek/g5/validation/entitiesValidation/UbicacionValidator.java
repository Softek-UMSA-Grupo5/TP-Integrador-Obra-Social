package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.validation.DataValidator;

public class UbicacionValidator {
	  public static boolean validateUbicacionRequestDto(UbicacionRequestDto dto) {
	        return DataValidator.validateString(dto.getCiudad(), 1, 255) &&
	               DataValidator.validateString(dto.getProvincia(), 1, 255) &&
	               DataValidator.validateString(dto.getCalle(), 1, 255) &&
	               DataValidator.validateInteger(dto.getAltura(), 1, Integer.MAX_VALUE);
	    }
}
