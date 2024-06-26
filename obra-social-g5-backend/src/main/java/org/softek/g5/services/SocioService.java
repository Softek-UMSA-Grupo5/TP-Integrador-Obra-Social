package org.softek.g5.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.entities.socio.SocioFactory;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.socio.dto.SocioResponseDto;
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
	public Collection<SocioResponseDto> getSocios() throws CustomServerException{
		try {
			Collection<Socio> socios = socioRepository.listAll();
			Collection<SocioResponseDto> dtos = new ArrayList<>();

			for (Socio s : socios) {
				dtos.add(socioFactory.createResponseFromEntity(s));
			}

			if (dtos.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de Socio");
			}
			return dtos;
			
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al obtener los socios");
		}
	}

	@Transactional
	public SocioResponseDto persistSocio(SocioRequestDto dto) throws CustomServerException{
		try {
			SocioResponseDto response = new SocioResponseDto();
			
			DataValidator.validateDtoFields(dto);
			if(!SocioValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos enviados de socio son erróneos");
			}

			Socio socio = socioFactory.createEntityFromDto(dto);
			Optional<Socio> optionalSocio = socioRepository.findByDni(socio.getDni());
			if (optionalSocio.isPresent()) {
				throw new RuntimeException("Este socio ya existe");
			}
			
			this.socioRepository.persist(socio);
			this.beneficiarioService.persistBeneficiario(socio.getDni(), dto.getBeneficiarios());
			
			response = socioFactory.createResponseFromEntity(socio);

			return response;
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al crear los socios");
		}
	}

	@Transactional
	public SocioResponseDto updateSocio(Long id, SocioRequestDto dto) throws CustomServerException{
		try {
			Optional<Socio> optionalSocio = Optional.of(socioRepository.findById(id));
			if (optionalSocio.isPresent()) {
				
				DataValidator.validateDtoFields(dto);
				if(!SocioValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos enviados de socio son erróneos");
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
				
				for (BeneficiarioRequestDto d : dto.getBeneficiarios()) {
					beneficiarioService.updateBeneficiario(d.getDni(), socio.getId(), d);
				}
				return this.socioFactory.createResponseFromEntity(socio);
			} else {
				throw new EntityNotFoundException("Socio no encontrado");
			}
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al actualizar los socios");
		}
	}

	@Transactional
	public void deleteSocio(Long id) throws CustomServerException{
		try {
			int updatedRows = this.socioRepository.update("estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Socio no encontrado");
			}
			List<Beneficiario> beneficiarios = this.beneficiarioRepository.findBySocio(id);
			for (Beneficiario b : beneficiarios) {
				beneficiarioService.deleteBeneficiario(b.getId(), id);
			}
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al eliminar un socio");
		}
	}
}
