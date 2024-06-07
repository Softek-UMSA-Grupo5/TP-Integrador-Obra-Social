package org.softek.g5.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.medicamento.InvalidMedicamentoData;
import org.softek.g5.exceptions.entitiesCustomException.medicamento.MedicamentoNotFoundException;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.utils.ReflectionMapper;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.MedicamentoValidator;

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

	@Inject
	SessionFactory sessionFactory;

	@Transactional
	public Collection<MedicamentoResponseDto> getMedicamentos() {
		Collection<Medicamento> medicamentos = medicamentoRepository.listAll();

		if (medicamentos.isEmpty()) {
			throw new EmptyTableException("No hay registros de medicamentos");
		}

		Collection<MedicamentoResponseDto> dtos = new ArrayList<>();

		for (Medicamento m : medicamentos) {
			MedicamentoResponseDto dto = new MedicamentoResponseDto();
			dto = ReflectionMapper.copyProperties(m, dto);
			dtos.add(dto);
			// dtos.add(medicamentoFactory.createResponseFromEntity(m));
		}

		return dtos;
	}

	@Transactional
	public Collection<MedicamentoResponseDto> persistMedicamento(String codigoReceta,
			List<MedicamentoRequestDto> dtos) {

		Collection<MedicamentoResponseDto> response = new ArrayList<>();

		for (MedicamentoRequestDto dto : dtos) {

			DataValidator.validateDtoFields(dto);

			if (!MedicamentoValidator.validateRequestDto(dto)) {
				throw new InvalidMedicamentoData("Los datos de medicamento enviados son erroneos");
			}

			// Medicamento medicamento = medicamentoFactory.createEntityFromDto(dto);

			Medicamento medicamento = new Medicamento();
			medicamento = ReflectionMapper.copyProperties(dto, medicamento);
			medicamento.setCodigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica());
			medicamento.setEstaEliminado(false);

			RecetaMedica recetaMedica = recetaMedicaRepository.findByCodigo(codigoReceta).get();

			Optional<Medicamento> optionalMedicamento = medicamentoRepository
					.findByCodigoyReceta(medicamento.getCodigo(), recetaMedica.getId());
			if (optionalMedicamento.isPresent()) {
				throw new RuntimeException(medicamento.getCodigo() + " este medicamento ya existe en la receta");
			}

			medicamento.setRecetaMedica(recetaMedica);

			this.medicamentoRepository.persist(medicamento);
			response.add(medicamentoFactory.createResponseFromEntity(medicamento));
		}

		return response;
	}

	@Transactional
	public MedicamentoResponseDto updateMedicamento(String codigoMedicamento, Long idReceta, MedicamentoRequestDto dto) {
		Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByCodigoyReceta(codigoMedicamento,
				idReceta);

		if (optionalMedicamento.isPresent()) {

			// Validación de los datos del DTO
			DataValidator.validateDtoFields(dto);
			if (!MedicamentoValidator.validateRequestDto(dto)) {
				throw new InvalidMedicamentoData("Los datos de medicamento enviados son erróneos");
			}

			Medicamento medicamento = optionalMedicamento.get();

			// Copiar las propiedades del DTO al objeto Medicamento
			medicamento = ReflectionMapper.copyProperties(dto, medicamento);

			// Ajustar el código según los datos del DTO
			medicamento.setCodigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica());

			return this.medicamentoFactory.createResponseFromEntity(medicamento);
		} else {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

	@Transactional
	public void deleteMedicamento(String codigoMedicamento, Long idReceta) {
		int updatedRows = this.medicamentoRepository
				.update("estaEliminado = true WHERE codigo = ?1 and recetaMedica.id = ?2", codigoMedicamento, idReceta);
		if (updatedRows == 0) {
			throw new MedicamentoNotFoundException("Medicamento no encontrado");
		}
	}

}
