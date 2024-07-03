package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioUpdateRequestDto;
import org.softek.g5.validation.DataValidator;

public class BeneficiarioValidator {
	public static boolean validateRequestDto(BeneficiarioRequestDto dto) {
		return DataValidator.validateString(dto.getNombre(), 2, 20)
				&& DataValidator.validateString(dto.getApellido(), 2, 20)
				&& DataValidator.validateString(dto.getTelefono(), 8, 15)
				&& DataValidator.validateString(dto.getEmail(), 3, 254)
				&& DataValidator.validateInteger(dto.getDni(), 1, 99999999)
				&& DataValidator.ValidateDate(dto.getFechaNacimiento())
				&& DataValidator.validateString(dto.getCuil(), 8, 15);
	}
	
	public static boolean validateRequestDto(BeneficiarioUpdateRequestDto dto) {
		return DataValidator.validateString(dto.getNombre(), 2, 20)
				&& DataValidator.validateString(dto.getApellido(), 2, 20)
				&& DataValidator.validateString(dto.getTelefono(), 8, 15)
				&& DataValidator.validateString(dto.getEmail(), 3, 254)
				&& DataValidator.validateInteger(dto.getDni(), 1, 99999999)
				&& DataValidator.ValidateDate(dto.getFechaNacimiento())
				&& DataValidator.validateString(dto.getCuil(), 8, 15);
	}
}
