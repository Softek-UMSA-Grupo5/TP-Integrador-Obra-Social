package org.softek.g5.validation.entitiesValidation;

import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoUpdateRequestDto;
import org.softek.g5.validation.DataValidator;

public class MedicamentoValidator {

	public static boolean validateRequestDto(MedicamentoRequestDto dto) {
		return DataValidator.validateString(dto.getNombre(), 3, 20)
				&& DataValidator.validateString(dto.getConcentracion(), 1, 255)
				&& DataValidator.validateString(dto.getFormaFarmaceutica(), 1, 255)
				&& DataValidator.validateString(dto.getFrecuencia(), 1, 255)
				&& DataValidator.validateString(dto.getDuracion(), 1, 255)
				&& DataValidator.validateString(dto.getInstrucciones(), 1, 255);
	}
	
	public static boolean validateRequestDto(MedicamentoUpdateRequestDto dto) {
		return DataValidator.validateString(dto.getNombre(), 3, 20)
				&& DataValidator.validateString(dto.getConcentracion(), 1, 255)
				&& DataValidator.validateString(dto.getFormaFarmaceutica(), 1, 255)
				&& DataValidator.validateString(dto.getFrecuencia(), 1, 255)
				&& DataValidator.validateString(dto.getDuracion(), 1, 255)
				&& DataValidator.validateString(dto.getInstrucciones(), 1, 255);
	}

}
