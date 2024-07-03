package org.softek.g5.services;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioUpdateRequestDto;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.entities.socio.SocioFactory;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.socio.dto.SocioUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.BeneficiarioRepository;
import org.softek.g5.repositories.SocioRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.SocioValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class SocioService {
	@Inject
	SocioRepository socioRepository;

	@Inject
	SocioFactory socioFactory;

	@Inject
	BeneficiarioService beneficiarioService;

	@Inject
	BeneficiarioFactory beneficiarioFactory;

	@Inject
	BeneficiarioRepository beneficiarioRepository;

	@Transactional
	public List<Socio> getSocios() throws CustomServerException {
		try {
			List<Socio> socios = socioRepository.listAll();

			if (socios.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de Socio");
			}
			return socios;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los socios");
		}
	}
	
	@Transactional
	public Socio getSocioById(Long id) throws CustomServerException {
		try {
			Socio socio = socioRepository.findById(id);

			if (socio == null) {
				throw new EntityNotFoundException("No hay registros de Socio");
			}
			return socio;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los socios");
		}
	}
	
	@Transactional
	public Socio getSocioByUser(Long id) throws CustomServerException {
		try {
			Optional<Socio> optionalSocio = socioRepository.findByUser(id);

			if (optionalSocio.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de Socio con ese usuario");
			}
			return optionalSocio.get();

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los socios");
		}
	}

	@Transactional
	public Socio persistSocio(SocioRequestDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);
			if (!SocioValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos enviados de socio son erróneos");
			}

			Socio socio = socioFactory.createEntityFromDto(dto);
			Optional<Socio> optionalSocio = socioRepository.findByDni(socio.getDni());
			if (optionalSocio.isPresent()) {
				throw new RuntimeException("Este socio ya existe");
			}

			this.socioRepository.persist(socio);
			this.beneficiarioService.persistBeneficiario(socio.getDni(), dto.getBeneficiarios());

			return socio;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al crear los socios");
		}
	}

	@Transactional
	public Socio updateSocio(SocioUpdateRequestDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);
			if (!SocioValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos enviados de socio son erróneos");
			}

			Optional<Socio> optionalSocio = Optional.of(socioRepository.findById(dto.getId()));
			if (optionalSocio.isEmpty()) {
				throw new EntityNotFoundException("Socio no encontrado");
			}

			Socio socio = optionalSocio.get();
			socio.setId(optionalSocio.get().getId());
			socio.setApellido(dto.getApellido());
			socio.setNombre(dto.getNombre());
			socio.setCuil(dto.getCuil());
			socio.setDni(dto.getDni());
			socio.setEmail(dto.getEmail());
			socio.setFechaNacimiento(dto.getFechaNacimiento());
			socio.setTelefono(dto.getTelefono());

			for (BeneficiarioUpdateRequestDto d : dto.getBeneficiarios()) {
				beneficiarioService.updateBeneficiario(socio.getId(), d);
			}
			return socio;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al actualizar los socios");
		}
	}

	@Transactional
	public void deleteSocio(Long id) throws CustomServerException {
		try {
			int updatedRows = this.socioRepository.update("estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Socio no encontrado");
			}
			List<Beneficiario> beneficiarios = this.beneficiarioRepository.findBySocio(id);
			for (Beneficiario b : beneficiarios) {
				beneficiarioService.deleteBeneficiario(b.getId(), id);
			}
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un socio");
		}
	}
}
