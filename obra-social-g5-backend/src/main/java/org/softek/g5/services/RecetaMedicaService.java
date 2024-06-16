package org.softek.g5.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.entities.recetaMedica.RecetaMedicaFactory;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityExistException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.exceptions.entitiesCustomException.recetaMedica.RecetaMedicaNotFoundException;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.RecetaMedicaValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class RecetaMedicaService {

	@Inject
	RecetaMedicaRepository recetaMedicaRepository;

	@Inject
	RecetaMedicaFactory recetaMedicaFactory;

	@Inject
	MedicamentoService medicamentoService;

	@Inject
	MedicamentoFactory medicamentoFactory;
	
	@Inject
	MedicamentoRepository medicamentoRepository;

	@Inject
	TurnoMedicoRepository turnoMedicoRepository;

	public List<RecetaMedicaResponseDto> getRecetaMedica() throws CustomServerException {
		try {
			List<RecetaMedica> recetaMedica = recetaMedicaRepository.listAll();

			if (recetaMedica.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de recetas médicas");
			}

			List<RecetaMedicaResponseDto> dtos = new ArrayList<>();

			for (RecetaMedica m : recetaMedica) {
				dtos.add(recetaMedicaFactory.createResponseFromEntity(m));
			}

			return dtos;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener las recetas medicas");
		}

	}

	public RecetaMedicaResponseDto getRecetaMedicaById(Long idReceta) throws CustomServerException {
		try {
			Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByIdOptional(idReceta);

			if (optionalRecetaMedica.isEmpty()) {
				throw new EntityNotFoundException("No se encontró la receta médica");
			}

			RecetaMedicaResponseDto response = recetaMedicaFactory.createResponseFromEntity(optionalRecetaMedica.get());

			return response;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}
	}

	public RecetaMedicaResponseDto getRecetaMedicaByCodigo(String codigoReceta) throws CustomServerException {
		try {
			Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByCodigo(codigoReceta);

			if (optionalRecetaMedica.isEmpty()) {
				throw new EntityNotFoundException("No se encontró la receta médica");
			}

			RecetaMedicaResponseDto response = recetaMedicaFactory.createResponseFromEntity(optionalRecetaMedica.get());

			return response;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}
	}

	public List<RecetaMedicaResponseDto> getRecetaMedicaBetweenDates(String fechaDesde, String fechaHasta)
			throws CustomServerException {
		try {

			LocalDate fd = LocalDate.parse(fechaDesde);
			LocalDate fh = LocalDate.parse(fechaHasta);

			if (fd.isAfter(LocalDate.now()) || fh.isAfter(LocalDate.now()) || fd.isAfter(fh)) {
				throw new InvalidDataRequest("Fecha desde no puede ser mayor a fecha hasta o al día actual");
			}

			List<RecetaMedica> listRecetaMedica = recetaMedicaRepository.findBetweenDates(fd, fh);

			if (listRecetaMedica.isEmpty()) {
				throw new EntityNotFoundException("No se encontraron recetas médicas entre esas fechas");
			}

			List<RecetaMedicaResponseDto> response = new ArrayList<>();

			for (RecetaMedica rm : listRecetaMedica) {
				response.add(recetaMedicaFactory.createResponseFromEntity(rm));
			}

			return response;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}
	}

	@Transactional
	public RecetaMedicaResponseDto persistRecetaMedica(String codigoTurno, RecetaMedicaRequestDto dto)
			throws CustomServerException {

		try {
			DataValidator.validateDtoFields(dto);

			if (!RecetaMedicaValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos de receta enviados son erroneos");
			}

			RecetaMedicaResponseDto response = new RecetaMedicaResponseDto();

			RecetaMedica recetaMedica = recetaMedicaFactory.createEntityFromDto(dto);

			Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByCodigo(recetaMedica.getCodigo());
			if (optionalRecetaMedica.isPresent()) {
				throw new EntityExistException("Esta receta ya existe en el turno");
			}

			Optional<TurnoMedico> turnoMedico = turnoMedicoRepository.findByCodigo(codigoTurno);
			if (!optionalRecetaMedica.isPresent()) {
				throw new EntityNotFoundException("El turno no se ha encontrado");
			}

			recetaMedica.setTurno(turnoMedico.get());

			this.recetaMedicaRepository.persist(recetaMedica);

			this.medicamentoService.persistMedicamento(recetaMedica.getCodigo(), dto.getMedicamentos());

			response = recetaMedicaFactory.createResponseFromEntity(recetaMedica);

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al guardar la receta medica");
		}
	}

	@Transactional
	public void updateRecetaMedica(String codigo, RecetaMedicaRequestDto dto) throws CustomServerException {

		try {

			DataValidator.validateDtoFields(dto);

			if (!RecetaMedicaValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos de receta enviados son erroneos");
			}
			
			Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByCodigo(codigo);
			if (optionalRecetaMedica.isEmpty()) {
				throw new EntityNotFoundException("Receta medica no encontrada");
			}
			
			RecetaMedica recetaMedica = optionalRecetaMedica.get();

			recetaMedica.setCantDiasVigencia(dto.getCantDiasVigencia());
			recetaMedica.setUltimaModificacion(LocalDate.now());

			for (MedicamentoRequestDto d : dto.getMedicamentos()) {
				medicamentoService.updateMedicamento(
						(d.getNombre() + "-" + d.getConcentracion() + "-" + d.getFormaFarmaceutica()),
						recetaMedica.getId(), d);
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al guardar la receta medica");
		}

	}

	@Transactional
	public void deleteRecetaMedica(String codigo) throws CustomServerException{
		
		try {
			
			int updatedRecetaMedicaRows = this.recetaMedicaRepository.update("estaEliminado = true WHERE codigo = ?1", codigo);
			this.medicamentoRepository.update("estaEliminado = true WHERE recetaMedica.id = ?1", recetaMedicaRepository.findByCodigo(codigo).get().getId());
			if (updatedRecetaMedicaRows == 0) {
				throw new RecetaMedicaNotFoundException("Receta médica no encontrada");
			}
			
			
		} catch(CustomServerException e) {
			throw new CustomServerException("Error al eliminar la receta medica");
		}
		
	}

}
