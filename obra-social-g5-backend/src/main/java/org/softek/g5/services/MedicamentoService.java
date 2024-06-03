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
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.MedicamentoNotFoundException;
import org.softek.g5.repositories.MedicamentoRepository;

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
	public Collection<MedicamentoResponseDto> persistMedicamento(List<MedicamentoRequestDto> dtos) {
		// Agregar validaciones si es necesario
		Collection<MedicamentoResponseDto> response = new ArrayList<>();
		for (MedicamentoRequestDto dto : dtos) {
			Medicamento medicamento = medicamentoFactory.createEntityFromDto(dto);
			Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByCodigo(medicamento.getCodigo());
			if(optionalMedicamento.isPresent()) {
				throw new RuntimeException(medicamento.getCodigo() + " este medicamento ya existe en la receta");
			}
			this.medicamentoRepository.persist(medicamento);
			response.add(medicamentoFactory.createResponseFromEntity(medicamento));
		}

		return response;
	}

	@Transactional
	public MedicamentoResponseDto updateMedicamento(String name, MedicamentoRequestDto dto) {
		Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByName(name);
		if (optionalMedicamento.isPresent()) {
			Medicamento medicamento = optionalMedicamento.get();

			try {
				// Copiar propiedades del DTO a la entidad, excluyendo id y recetaMedica
				BeanUtils.copyProperties(medicamento, dto);

				// Reasignar manualmente el ID y la receta médica para evitar cambios no
				// deseados
				medicamento.setId(optionalMedicamento.get().getId());

				// No es necesario llamar a persist, ya que Panache sincroniza automáticamente
			} catch (IllegalAccessException | InvocationTargetException e) {
				throw new RuntimeException("Error al copiar propiedades", e);
			}

			return this.medicamentoFactory.createResponseFromEntity(medicamento);
		} else {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

	@Transactional
	public void deleteMedicamento(String name) {
		int updatedRows = this.medicamentoRepository.update("estaEliminado = true WHERE nombre = ?1", name);
		if (updatedRows == 0) {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

}
