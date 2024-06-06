package org.softek.g5.entities.recetaMedica;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.repositories.RecetaMedicaRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RecetaMedicaFactory {
	
	@Inject
    MedicamentoFactory medicamentoFactory;
	
	@Inject
	RecetaMedicaRepository recetaMedicaRepository;

    public RecetaMedica createEntityFromDto(RecetaMedicaRequestDto dto) {
        return RecetaMedica.builder()
                .codigo("Receta-" + (recetaMedicaRepository.count() + 1))
                .fechaEmision(LocalDate.now())
                .ultimaModificacion(LocalDate.now())
                .cantDiasVigencia(dto.getCantDiasVigencia())
                .estaEliminado(false)
                //.medicamentos(createListMedicamentoFromDto(dto.getMedicamentos()))
                .build();
    }
    
    /*
    public List<Medicamento> createListMedicamentoFromDto(List<MedicamentoRequestDto> dtos){
    	List<Medicamento> medicamentos = new ArrayList<>();
    	for (MedicamentoRequestDto dto : dtos) {
    		medicamentos.add(medicamentoFactory.createEntityFromDto(dto));
		}
    	return medicamentos;
    }
    */

    public RecetaMedicaResponseDto createResponseFromEntity(RecetaMedica recetaMedica) {
        return RecetaMedicaResponseDto.builder()
                .codigo(recetaMedica.getCodigo())
                .fechaEmision(recetaMedica.getFechaEmision())
                .ultimaModificacion(recetaMedica.getUltimaModificacion())
                .cantDiasVigencia(recetaMedica.getCantDiasVigencia())
                .estaEliminado(recetaMedica.getEstaEliminado())
                .medicamentos(createListMedicamentoDtoFromEntity(recetaMedica.getMedicamentos()))
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
