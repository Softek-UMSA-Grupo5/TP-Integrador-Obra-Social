package org.softek.g5.services;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.MedicoValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class MedicoService {
	@Inject
	MedicoRepository medicoRepository;
	
	@Inject
	MedicoFactory medicoFactory;
	
	@Inject
	ConsultorioRepository consultorioRepository;
	
	@Inject
	ConsultorioService consultorioService;
	
	@Transactional
	public Collection<MedicoResponseDto> getMedicosEspecialistas() throws CustomServerException{
		try {
			
			Collection<Medico> medicos = medicoRepository.listAll();
			Collection<MedicoResponseDto> dtos = new ArrayList<>();

			for (Medico m : medicos) {
				dtos.add(medicoFactory.createResponseFromEntity(m));
			}
			
			if (dtos.isEmpty()) {
	            throw new EntityNotFoundException("No hay registros de Médico");
	        }
			return dtos;
			
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al obtener los médicos");
		}
	}
	
	@Transactional
	public Collection<MedicoResponseDto> persistMedico(List<MedicoRequestDto> dtos) throws CustomServerException{
		try {
			Collection<MedicoResponseDto> response = new ArrayList<>();
			for (MedicoRequestDto dto : dtos) {
				
				DataValidator.validateDtoFields(dto);
				if(!MedicoValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos enviados de médico son erróneos");
				}
				
				Medico medico = medicoFactory.createEntityFromDto(dto);
				
				Optional<Medico> optionalMedico = medicoRepository.findByDni(medico.getDni());
				
				if(optionalMedico.isPresent()) {
					throw new RuntimeException("Este médico ya existe");
				}

				this.medicoRepository.persist(medico);
				
				if(dto.getConsultorios() != null) {
					if(!dto.getConsultorios().isEmpty()) {
						for(ConsultorioRequestDto d : dto.getConsultorios()) {
							consultorioService.updateConsultorio(medico.getDni(), d);
						}
					}
				}				
				response.add(medicoFactory.createResponseFromEntity(medico));
			}
			return response;
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al crear los médicos");
		}
	}
	
	@Transactional
    public MedicoResponseDto updateMedico(Long id, MedicoRequestDto dto) throws CustomServerException{
		try {
			
			Optional<Medico> optionalMedico = Optional.of(medicoRepository.findById(id));
	        if (optionalMedico.isPresent()) {
	        	
	        	DataValidator.validateDtoFields(dto);
				if(!MedicoValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos enviados de médico son erróneos");
				}
	        	
	            Medico medico = optionalMedico.get();
	            medico.setId(optionalMedico.get().getId());		
	            medico.setNombre(dto.getNombre());
	            medico.setApellido(dto.getApellido());
	            medico.setTelefono(dto.getTelefono());
	            medico.setEmail(dto.getEmail());
	            medico.setDni(dto.getDni());
	            medico.setFechaNacimiento(dto.getFechaNacimiento());
	            medico.setCuil(dto.getCuil());
	            medico.setEspecialidad(dto.getEspecialidad());
	            for(ConsultorioRequestDto d : dto.getConsultorios()){
	            	consultorioService.updateConsultorio(medico.getDni(), d);	
	            }
	            
	            return this.medicoFactory.createResponseFromEntity(medico);
	        } else {
	            throw new EntityNotFoundException("Médico no encontrado");
	        }
			
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al actualizar los médicos");
		}
    }
	
	@Transactional
	public void deleteMedico(Long id) throws CustomServerException{
		try {
			int updatedRows = this.medicoRepository.update("estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medico no encontrado");
			}
		}catch(CustomServerException e) {
			throw new CustomServerException("Error al eliminar un médico");
		}		
	}
}
