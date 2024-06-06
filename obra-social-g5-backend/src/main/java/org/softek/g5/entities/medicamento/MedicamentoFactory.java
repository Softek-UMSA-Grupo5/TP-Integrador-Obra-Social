package org.softek.g5.entities.medicamento;

import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicamentoFactory {

	public Medicamento createEntityFromDto(MedicamentoRequestDto dto) {
		return Medicamento.builder()
				.codigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica())
				.nombre(dto.getNombre())
				.concentracion(dto.getConcentracion())
				.formaFarmaceutica(dto.getFormaFarmaceutica())
				.frecuencia(dto.getFrecuencia())
				.duracion(dto.getDuracion())
				.instrucciones(dto.getInstrucciones())
				.estaEliminado(false)
				.build();
	}
	
	public MedicamentoResponseDto createResponseFromEntity(Medicamento medicamento) {
		return MedicamentoResponseDto.builder()
				.codigo(medicamento.getCodigo())
				.nombre(medicamento.getNombre())
				.concentracion(medicamento.getConcentracion())
				.formaFarmaceutica(medicamento.getFormaFarmaceutica())
				.frecuencia(medicamento.getFrecuencia())
				.duracion(medicamento.getDuracion())
				.instrucciones(medicamento.getInstrucciones())
				.estaEliminado(medicamento.getEstaEliminado())
				.receta(medicamento.getRecetaMedica().getId())
				.build();
	}
	
}
