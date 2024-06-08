package org.softek.g5.services;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.MedicoNotFoundException;
import org.softek.g5.repositories.MedicoRepository;

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
	
	@Transactional
	public Collection<MedicoResponseDto> getMedicosEspecialistas(){
		Collection<Medico> medicos = medicoRepository.listAll();
		Collection<MedicoResponseDto> dtos = new ArrayList<>();

		for (Medico m : medicos) {
			dtos.add(medicoFactory.createResponseFromEntity(m));
		}
		
		if (dtos.isEmpty()) {
            throw new EmptyTableException("No hay registros de Medico");
        }

		return dtos;
	}
	
	@Transactional
	public Collection<MedicoResponseDto> persistMedico(List<MedicoRequestDto> dtos) {
		Collection<MedicoResponseDto> response = new ArrayList<>();
		for (MedicoRequestDto dto : dtos) {
			Medico medico = medicoFactory.createEntityFromDto(dto);
			Optional<Medico> optionalMedico = medicoRepository.findByDni(medico.getDni());
			
			if(optionalMedico.isPresent()) {
				throw new RuntimeException("Este medico ya existe");
			}
			
			this.medicoRepository.persist(medico);
			//persistir consultorio
			
			response.add(medicoFactory.createResponseFromEntity(medico));
		}

		return response;
	}
	
	@Transactional
    public MedicoResponseDto updateMedico(Long id, MedicoRequestDto dto) {
        Optional<Medico> optionalMedico = Optional.of(medicoRepository.findById(id));
        if (optionalMedico.isPresent()) {
            Medico medico = optionalMedico.get();
            
            //Actualizar datos del medico manualmente
            
            return this.medicoFactory.createResponseFromEntity(medico);
        } else {
            throw new MedicoNotFoundException("Medico no encontrado");
        }
    }
	
	//Agregar método para setear turno medico
	
	@Transactional
	public void deleteMedico(Long id) {
		int updatedRows = this.medicoRepository.update("estaEliminado = true WHERE id = ?1", id);
		if (updatedRows == 0) {
			throw new MedicoNotFoundException("Medico no encontrado");
		}
	}
}
