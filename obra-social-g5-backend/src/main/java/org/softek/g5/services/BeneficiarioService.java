package org.softek.g5.services;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.BeneficiarioRepository;
import org.softek.g5.repositories.SocioRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.BeneficiarioValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class BeneficiarioService {
	@Inject
	BeneficiarioRepository beneficiarioRepository;
	
	@Inject
	BeneficiarioFactory beneficiarioFactory;
	
	@Inject
	SocioRepository socioRepository;
	
	@Transactional
	public Collection<BeneficiarioResponseDto> getBeneficiarios() throws CustomServerException{
		try {
			Collection<Beneficiario> beneficiarios = beneficiarioRepository.listAll();
			
			if(beneficiarios.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de beneficiarios");
			}
			
			Collection<BeneficiarioResponseDto> dtos = new ArrayList<>();
			
			for (Beneficiario b : beneficiarios) {
				dtos.add(beneficiarioFactory.createResponseFromEntity(b));
			}
			
			return dtos;
		} catch(CustomServerException e) {
			throw new CustomServerException("Error al obtener los beneficiarios");
		}
	}

	@Transactional
	public Collection<BeneficiarioResponseDto> persistBeneficiario(int dniSocio, List<BeneficiarioRequestDto> dtos) throws CustomServerException{
		try {
			
			Collection<BeneficiarioResponseDto> response = new ArrayList<>();	
			for (BeneficiarioRequestDto dto : dtos) {
				
				DataValidator.validateDtoFields(dto);
				if(!BeneficiarioValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos enviados de beneficiario son erroneos");
				}
				
				Beneficiario beneficiario = beneficiarioFactory.createEntityFromDto(dto);
				Socio socio = socioRepository.findByDni(dniSocio).get();
				if(socio.getEstaEliminado()==true) {
					throw new RuntimeException("El socio está eliminado");
				}else {
					Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository.findByDniyIdSocio(beneficiario.getDni(), socio.getId());
					if(optionalBeneficiario.isPresent()) {
						throw new RuntimeException("Este beneficiario ya está agregado al grupo familiar del socio");
					}
					beneficiario.setSocio(socio);
					this.beneficiarioRepository.persist(beneficiario);
					response.add(beneficiarioFactory.createResponseFromEntity(beneficiario));
				}
			}
			return response;
			
		} catch(CustomServerException e) {
			throw new CustomServerException("Error al crear los beneficiarios");
		}
	}

	@Transactional
	public BeneficiarioResponseDto updateBeneficiario(int dniBeneficiario, Long idSocio, BeneficiarioRequestDto dto) throws CustomServerException{
		try {
			
			Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository.findByDniyIdSocio(dniBeneficiario, idSocio);
			if (optionalBeneficiario.isPresent()) {
				
				DataValidator.validateDtoFields(dto);
				if(!BeneficiarioValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos enviados de beneficiario son erroneos");
				}
				
				Beneficiario beneficiario = optionalBeneficiario.get();
				beneficiario.setId(optionalBeneficiario.get().getId());
				beneficiario.setNombre(dto.getNombre());
				beneficiario.setApellido(dto.getApellido());
				beneficiario.setTelefono(dto.getTelefono());
				beneficiario.setEmail(dto.getEmail());
				beneficiario.setDni(dto.getDni());
				beneficiario.setFechaNacimiento(dto.getFechaNacimiento());
				beneficiario.setCuil(dto.getCuil());
				
				return this.beneficiarioFactory.createResponseFromEntity(beneficiario);
			} else {
				throw new EntityNotFoundException("Beneficiario no encontrado");
			}
			
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al actualizar los beneficiarios");
		}
	}

	@Transactional
	public void deleteBeneficiario(Long idBeneficiario, Long idSocio) throws CustomServerException{
		try {
			
			int updatedRows = this.beneficiarioRepository.update("estaEliminado = true WHERE id = ?1 and socio.id = ?2", idBeneficiario, idSocio);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Beneficiario no encontrado");
			}
			
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al eliminar un beneficiario");
		}
	}
}
