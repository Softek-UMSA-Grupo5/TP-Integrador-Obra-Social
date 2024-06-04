package org.softek.g5.services;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.MedicamentoNotFoundException;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class MedicamentoService {

	@Inject
	MedicamentoRepository medicamentoRepository;

	@Inject
	MedicamentoFactory medicamentoFactory;
	
	@Inject
	RecetaMedicaRepository recetaMedicaRepository;

	@Transactional
	public Collection<MedicamentoResponseDto> getMedicamentos() {
		Collection<Medicamento> medicamentos = medicamentoRepository.listAll();
		Collection<MedicamentoResponseDto> dtos = new ArrayList<>();

		for (Medicamento m : medicamentos) {
			dtos.add(medicamentoFactory.createResponseFromEntity(m));
		}

		if (dtos.isEmpty()) {
			throw new EmptyTableException("No hay registros de medicamentos");
		}

		return dtos;
	}

	@Transactional
	public Collection<MedicamentoResponseDto> persistMedicamento(String codigoReceta, List<MedicamentoRequestDto> dtos) {
		// Agregar validaciones si es necesario
		Collection<MedicamentoResponseDto> response = new ArrayList<>();
		
		for (MedicamentoRequestDto dto : dtos) {
			
			Medicamento medicamento = medicamentoFactory.createEntityFromDto(dto);
			
			RecetaMedica recetaMedica = recetaMedicaRepository.findByCodigo(codigoReceta).get();
			medicamento.setRecetaMedica(recetaMedica);
			
			Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByCodigoyReceta(medicamento.getCodigo(), recetaMedica.getId());
			if(optionalMedicamento.isPresent()) {
				throw new RuntimeException(medicamento.getCodigo() + " este medicamento ya existe en la receta");
			}
			
			this.medicamentoRepository.persist(medicamento);
			response.add(medicamentoFactory.createResponseFromEntity(medicamento));
		}

		return response;
	}

	@Transactional
	public MedicamentoResponseDto updateMedicamento(String codigoMedicamento, Long idReceta, MedicamentoRequestDto dto) {
		Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByCodigoyReceta(codigoMedicamento, idReceta);
		if (optionalMedicamento.isPresent()) {
			Medicamento medicamento = optionalMedicamento.get();

				try {
					
					BeanUtils.copyProperties(medicamento, dto);
					
					medicamento.setId(optionalMedicamento.get().getId());
					medicamento.setCodigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica());
					
				} catch (IllegalAccessException | InvocationTargetException e) {
	                throw new RuntimeException("Error al copiar propiedades", e);
				}
				
			return this.medicamentoFactory.createResponseFromEntity(medicamento);
		} else {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

	@Transactional
	public void deleteMedicamento(String codigoMedicamento, Long idReceta) {
		int updatedRows = this.medicamentoRepository.update("estaEliminado = true WHERE codigo = ?1 and recetaMedica_id = ?2", codigoMedicamento, idReceta);
		if (updatedRows == 0) {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

}
