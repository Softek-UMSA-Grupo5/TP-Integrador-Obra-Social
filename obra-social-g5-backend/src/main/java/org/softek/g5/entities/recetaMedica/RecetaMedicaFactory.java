package org.softek.g5.entities.recetaMedica;

import java.time.LocalDate;

import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.repositories.MedicamentoRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RecetaMedicaFactory {

	@Inject
	MedicamentoRepository medicamentoRepository;
	
	public RecetaMedica createEntityFromDto(RecetaMedicaRequestDto dto) {
		return RecetaMedica.builder()
				.fechaEmision(LocalDate.now())
				.ultimaModificacion(LocalDate.now())
				.cantDiasVigencia(dto.getCantDiasVigencia())
				.estaEliminado(false)
				.medicamentos(dto.getMedicamentos())
				.build();
	}
	
	public RecetaMedicaResponseDto createResponseFromEntity(RecetaMedica recetaMedica) {
		return RecetaMedicaResponseDto.builder()
				.fechaEmision(recetaMedica.getFechaEmision())
				.ultimaModificacion(recetaMedica.getUltimaModificacion())
				.cantDiasVigencia(recetaMedica.getCantDiasVigencia())
				.estaEliminado(recetaMedica.getEstaEliminado())
				.medicamentos(recetaMedica.getMedicamentos())
				.build();
	}
	
}
