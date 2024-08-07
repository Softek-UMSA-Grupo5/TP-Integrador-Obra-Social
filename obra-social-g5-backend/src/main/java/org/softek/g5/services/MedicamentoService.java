package org.softek.g5.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoUpdateRequestDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityExistException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.MedicamentoValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
@Transactional
public class MedicamentoService {

	@Inject
	MedicamentoRepository medicamentoRepository;

	@Inject
	MedicamentoFactory medicamentoFactory;

	@Inject
	RecetaMedicaRepository recetaMedicaRepository;

	public List<Medicamento> getMedicamentos() throws CustomServerException {
		try {
			List<Medicamento> medicamentos = medicamentoRepository.listAll();

			if (medicamentos.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de medicamentos");
			}

			return medicamentos;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener medicamento por id");
		}
	}

	public Medicamento getMedicamentosById(Long id) throws CustomServerException {

		try {
			Medicamento medicamento = medicamentoRepository.findById(id);

			if (medicamento == null) {
				throw new EntityNotFoundException("No se encontró el medicamento con id " + id);
			}

			return medicamento;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los medicamentos");
		}
	}

	public List<Medicamento> getMedicamentosByCodigo(String codigo) throws CustomServerException {
		try {
			List<Medicamento> medicamentos = medicamentoRepository.findByCodigo(codigo);

			if (medicamentos.isEmpty()) {
				throw new EntityNotFoundException("No se encontró medicamentos con codigo " + codigo);
			}

			return medicamentos;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los medicamento");
		}
	}

	public List<Medicamento> getMedicamentosByReceta(Long id) throws CustomServerException {

		try {
			List<Medicamento> medicamentos = medicamentoRepository.findByReceta(id);

			if (medicamentos.isEmpty()) {
				throw new EntityNotFoundException("No se encontró medicamentos con la receta id " + id);
			}

			return medicamentos;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los medicamento");
		}

	}

	@Transactional
	public List<Medicamento> persistMedicamento(Long idReceta, List<MedicamentoRequestDto> dtos)
			throws CustomServerException {

		try {

			List<Medicamento> response = new ArrayList<>();

			for (MedicamentoRequestDto dto : dtos) {

				DataValidator.validateDtoFields(dto);

				if (!MedicamentoValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos de medicamento enviados son erroneos");
				}

				Medicamento medicamento = medicamentoFactory.createEntityFromDto(dto);

				RecetaMedica existRecetaMedica = recetaMedicaRepository.findById(idReceta);

				if (existRecetaMedica == null) {
					throw new EntityNotFoundException("No se encontró la receta medica");
				}

				Optional<Medicamento> optionalMedicamento = medicamentoRepository
						.findByCodigoyReceta(medicamento.getCodigo(), existRecetaMedica.getId());

				if (optionalMedicamento.isPresent()) {
					throw new EntityExistException(
							medicamento.getCodigo() + " este medicamento ya existe en la receta");
				}

				medicamento.setRecetaMedica(existRecetaMedica);

				medicamento.persist();

				response.add(medicamento);
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al crear los medicamentos");
		}

	}

	@Transactional
	public Medicamento updateMedicamento(Long idReceta, MedicamentoUpdateRequestDto dto)
			throws CustomServerException {

		try {

			DataValidator.validateDtoFields(dto);

			if (!MedicamentoValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos de medicamento enviados son erróneos");
			}

			Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByidyReceta(dto.getId(),
					idReceta);

			if (optionalMedicamento.isEmpty()) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

			Medicamento medicamento = optionalMedicamento.get();

			medicamento.setCodigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica());
			medicamento.setNombre(dto.getNombre());
			medicamento.setConcentracion(dto.getConcentracion());
			medicamento.setFormaFarmaceutica(dto.getFormaFarmaceutica());
			medicamento.setFrecuencia(dto.getFrecuencia());
			medicamento.setDuracion(dto.getDuracion());
			medicamento.setInstrucciones(dto.getInstrucciones());

			return medicamento;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al actualizar los medicamentos");
		}

	}

	@Transactional
	public void deleteMedicamento(Long idMedicamento, Long idReceta) throws CustomServerException {

		try {

			int updatedRows = this.medicamentoRepository.update(
					"estaEliminado = true WHERE id = ?1 and recetaMedica.id = ?2", idMedicamento, idReceta);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un medicamento");
		}

	}

}
