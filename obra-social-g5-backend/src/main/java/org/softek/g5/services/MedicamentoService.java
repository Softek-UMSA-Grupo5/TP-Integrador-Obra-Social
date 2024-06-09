package org.softek.g5.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

	@Transactional
	public List<MedicamentoResponseDto> getMedicamentos() throws Exception {
		try {
			Collection<Medicamento> medicamentos = medicamentoRepository.listAll();

			if (medicamentos.isEmpty()) {
				throw new EmptyTableException("No hay registros de medicamentos");
			}

			List<MedicamentoResponseDto> dtos = new ArrayList<>();

			for (Medicamento m : medicamentos) {
				dtos.add(medicamentoFactory.createResponseFromEntity(m));
			}

			return dtos;
		} catch (Exception e) {
			throw new Exception("Error al obtener los medicamentos");
		}
	}

	@Transactional
	public Collection<MedicamentoResponseDto> persistMedicamento(String codigoReceta, List<MedicamentoRequestDto> dtos)
			throws Exception {

		try {

			Collection<MedicamentoResponseDto> response = new ArrayList<>();

			for (MedicamentoRequestDto dto : dtos) {

				DataValidator.validateDtoFields(dto);

				if (!MedicamentoValidator.validateRequestDto(dto)) {
					throw new InvalidMedicamentoData("Los datos de medicamento enviados son erroneos");
				}

				Medicamento medicamento = medicamentoFactory.createEntityFromDto(dto);

				RecetaMedica recetaMedica = recetaMedicaRepository.findByCodigo(codigoReceta).get();

				Optional<Medicamento> optionalMedicamento = medicamentoRepository
						.findByCodigoyReceta(medicamento.getCodigo(), recetaMedica.getId());
				if (optionalMedicamento.isPresent()) {
					throw new RuntimeException(medicamento.getCodigo() + " este medicamento ya existe en la receta");
				}

				medicamento.setRecetaMedica(recetaMedica);

				medicamento.persist();

				response.add(medicamentoFactory.createResponseFromEntity(medicamento));
			}

			return response;

		} catch (Exception e) {
			throw new Exception("Error al crear los medicamentos");
		}

	}

	@Transactional
	public MedicamentoResponseDto updateMedicamento(String codigoMedicamento, Long idReceta, MedicamentoRequestDto dto)
			throws Exception {

		try {

			Optional<Medicamento> optionalMedicamento = medicamentoRepository.findByCodigoyReceta(codigoMedicamento,
					idReceta);

			if (optionalMedicamento.isPresent()) {

				DataValidator.validateDtoFields(dto);
				if (!MedicamentoValidator.validateRequestDto(dto)) {
					throw new InvalidMedicamentoData("Los datos de medicamento enviados son erróneos");
				}

				Medicamento medicamento = optionalMedicamento.get();

				medicamento
						.setCodigo(dto.getNombre() + "-" + dto.getConcentracion() + "-" + dto.getFormaFarmaceutica());
				medicamento.setNombre(dto.getNombre());
				medicamento.setConcentracion(dto.getConcentracion());
				medicamento.setFormaFarmaceutica(dto.getFormaFarmaceutica());
				medicamento.setFrecuencia(dto.getFrecuencia());
				medicamento.setDuracion(dto.getDuracion());
				medicamento.setInstrucciones(dto.getInstrucciones());

				return this.medicamentoFactory.createResponseFromEntity(medicamento);
			} else {
				throw new MedicamentoNotFoundException("Medicamento no encontrado");
			}

		} catch (Exception e) {
			throw new Exception("Error al actualizar los medicamentos");
		}

	}

	@Transactional
	public void deleteMedicamento(String codigoMedicamento, Long idReceta) throws Exception {
		
		try {
			
			int updatedRows = this.medicamentoRepository
					.update("estaEliminado = true WHERE codigo = ?1 and recetaMedica.id = ?2", codigoMedicamento, idReceta);
			if (updatedRows == 0) {
				throw new MedicamentoNotFoundException("Medicamento no encontrado");
			}
			
		}catch(Exception e) {
			throw new Exception("Error al eliminar un medicamento");
		}
		
	}

}
