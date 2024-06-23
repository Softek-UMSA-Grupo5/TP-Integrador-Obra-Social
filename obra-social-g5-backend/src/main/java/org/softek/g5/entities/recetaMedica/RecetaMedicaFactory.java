package org.softek.g5.entities.recetaMedica;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RecetaMedicaFactory {
	
	@Inject
    MedicamentoFactory medicamentoFactory;
	
	@Inject
	MedicamentoRepository medicamentoRepository;
	
	@Inject
	RecetaMedicaRepository recetaMedicaRepository;

    public RecetaMedica createEntityFromDto(RecetaMedicaRequestDto dto) {
        return RecetaMedica.builder()
                .codigo("receta-" + (recetaMedicaRepository.count() + 1))
                .fechaEmision(LocalDate.now())
                .ultimaModificacion(LocalDate.now())
                .cantDiasVigencia(dto.getCantDiasVigencia())
                .estaEliminado(false)
                .build();
    }

    public RecetaMedicaResponseDto createResponseFromEntity(RecetaMedica recetaMedica) {
        return RecetaMedicaResponseDto.builder()
        		.id(recetaMedica.getId())
                .codigo(recetaMedica.getCodigo())
                .fechaEmision(recetaMedica.getFechaEmision())
                .ultimaModificacion(recetaMedica.getUltimaModificacion())
                .cantDiasVigencia(recetaMedica.getCantDiasVigencia())
                .estaEliminado(recetaMedica.getEstaEliminado())
                .medicamentos(createListMedicamentoDtoFromEntity(medicamentoRepository.findByReceta(recetaMedica.getId())))
                .turnoId(recetaMedica.getTurno().getId())
                .build();
    }

    public List<MedicamentoResponseDto> createListMedicamentoDtoFromEntity(List<Medicamento> medicamentos){
    	List<MedicamentoResponseDto> response = new ArrayList<>();
    	for (Medicamento m : medicamentos) {
    		response.add(medicamentoFactory.createResponseFromEntity(m));
		}
    	return response;
    }
}
