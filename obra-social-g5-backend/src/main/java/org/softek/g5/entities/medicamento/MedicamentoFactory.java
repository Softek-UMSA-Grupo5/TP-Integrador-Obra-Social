package org.softek.g5.entities.medicamento;

import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicamentoFactory {

	public Medicamento createEntityFromDto(MedicamentoRequestDto dto) {
		return Medicamento.builder()
				.medicacion(dto.getMedicacion())
				.posología(dto.getPosología())
				.frecuencia(dto.getFrecuencia())
				.duracion(dto.getDuracion())
				.instrucciones(dto.getInstrucciones())
				.estaEliminado(false)
				.build();
	}
	
	public MedicamentoResponseDto createResponseFromEntity(Medicamento medicamento) {
		return MedicamentoResponseDto.builder()
				.medicacion(medicamento.getMedicacion())
				.posología(medicamento.getPosología())
				.frecuencia(medicamento.getFrecuencia())
				.duracion(medicamento.getDuracion())
				.instrucciones(medicamento.getInstrucciones())
				.estaEliminado(medicamento.getEstaEliminado())
				.build();
	}
	
}
