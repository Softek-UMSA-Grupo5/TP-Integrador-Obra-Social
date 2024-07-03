package org.softek.g5.services;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.recepcionista.Recepcionista;
import org.softek.g5.entities.recepcionista.RecepcionistaFactory;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaRequestDto;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.RecepcionistaRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.RecepcionistaValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class RecepcionistaService {

	@Inject
	RecepcionistaRepository recepcionistaRepository;

	@Inject
	RecepcionistaFactory recepcionistaFactory;


	@Transactional
	public List<Recepcionista> getRecepcionistas() throws CustomServerException {
		try {
			List<Recepcionista> recepcionistas = recepcionistaRepository.listAll();

			if (recepcionistas.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de Recepcionista");
			}
			return recepcionistas;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los recepcionistas");
		}
	}
	
	@Transactional
	public Recepcionista getRecepcionistaById(Long id) throws CustomServerException {
		try {
			Recepcionista recepcionista = recepcionistaRepository.findById(id);

			if (recepcionista == null) {
				throw new EntityNotFoundException("No hay registros de Recepcionista");
			}
			return recepcionista;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los recepcionistas");
		}
	}
	
	@Transactional
	public Recepcionista getRecepcionistaByUser(Long id) throws CustomServerException {
		try {
			Optional<Recepcionista> optionalRecepcionista = recepcionistaRepository.findByUser(id);

			if (optionalRecepcionista.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de Recepcionista con ese usuario");
			}
			return optionalRecepcionista.get();

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los recepcionistas");
		}
	}

	@Transactional
	public Recepcionista persistRecepcionista(RecepcionistaRequestDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);
			if (!RecepcionistaValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos enviados de recepcionista son erróneos");
			}

			Recepcionista recepcionista = recepcionistaFactory.createEntityFromDto(dto);
			Optional<Recepcionista> optionalRecepcionista = recepcionistaRepository.findByDni(recepcionista.getDni());
			if (optionalRecepcionista.isPresent()) {
				throw new RuntimeException("Este recepcionista ya existe");
			}

			this.recepcionistaRepository.persist(recepcionista);

			return recepcionista;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al crear los recepcionistas");
		}
	}

	@Transactional
	public Recepcionista updateRecepcionista(RecepcionistaUpdateRequestDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);
			if (!RecepcionistaValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos enviados de recepcionista son erróneos");
			}

			Optional<Recepcionista> optionalRecepcionista = Optional.of(recepcionistaRepository.findById(dto.getId()));
			if (optionalRecepcionista.isEmpty()) {
				throw new EntityNotFoundException("Recepcionista no encontrado");
			}

			Recepcionista recepcionista = optionalRecepcionista.get();
			recepcionista.setId(optionalRecepcionista.get().getId());
			recepcionista.setApellido(dto.getApellido());
			recepcionista.setNombre(dto.getNombre());
			recepcionista.setCuil(dto.getCuil());
			recepcionista.setDni(dto.getDni());
			recepcionista.setEmail(dto.getEmail());
			recepcionista.setFechaNacimiento(dto.getFechaNacimiento());
			recepcionista.setTelefono(dto.getTelefono());

			return recepcionista;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al actualizar los recepcionistas");
		}
	}

	@Transactional
	public void deleteRecepcionista(Long id) throws CustomServerException {
		try {
			int updatedRows = this.recepcionistaRepository.update("estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Recepcionista no encontrado");
			}
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un recepcionista");
		}
	}
	
}
