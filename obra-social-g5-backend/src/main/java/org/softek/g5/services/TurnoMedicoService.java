package org.softek.g5.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.recetaMedica.RecetaMedicaFactory;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.entities.socio.SocioFactory;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.TurnoMedicoNotFoundException;
import org.softek.g5.exceptions.entitiesCustomException.medicamento.InvalidMedicamentoData;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.SocioRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.TurnoMedicoValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class TurnoMedicoService {

	@Inject
	TurnoMedicoRepository turnoMedicoRepository;
	
	@Inject
	TurnoMedicoFactory turnoMedicoFactory;
	
	@Inject
	RecetaMedicaFactory recetaMedicaFactory;
	
	@Inject
	SocioRepository socioRepository;
	
	@Inject
	SocioFactory socioFactory;
	
	@Inject
	MedicoRepository medicoRepository;
	
	@Inject
	MedicoFactory medicoFactory;

	@Transactional
    public Collection<TurnoMedicoResponseDto> getTurnoMedico() {
        Collection<TurnoMedico> turnoMedico = turnoMedicoRepository.listAll();
        Collection<TurnoMedicoResponseDto> dtos = new ArrayList<>();

        for (TurnoMedico m : turnoMedico) {
            dtos.add(turnoMedicoFactory.createResponseFromEntity(m));
        }

        if (dtos.isEmpty()) {
            throw new EmptyTableException("No hay registros de turnoMedico");
        }

        return dtos;
    }
    
    @Transactional
    public Collection<TurnoMedicoResponseDto> persistTurnoMedico(List<TurnoMedicoRequestDto> dtos) {
        Collection<TurnoMedicoResponseDto> response = new ArrayList<>();
        for (TurnoMedicoRequestDto dto : dtos) {
        	
        	DataValidator.validateDtoFields(dto);

			if (!TurnoMedicoValidator.validateRequestDto(dto)) {
				throw new InvalidMedicamentoData("Los datos de turno medico enviados son erroneos");
			}
        	
            TurnoMedico turnoMedico = turnoMedicoFactory.createEntityFromDto(dto);
            Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigo(turnoMedico.getCodigo());
			if(optionalturnoMedico.isPresent()) {
				throw new RuntimeException("Este turno ya existe");
			}
			
			Optional<Medico> medico = Optional.of(medicoRepository.findByDni(dto.getMedico().getDni()).get());
			Optional<Socio> socio = Optional.of(socioRepository.findByDni(dto.getSocio().getDni()).get());
			
			turnoMedico.setMedico(medico.get());
			turnoMedico.setSocio(socio.get());
			
            this.turnoMedicoRepository.persist(turnoMedico);
            response.add(turnoMedicoFactory.createResponseFromEntity(turnoMedico));
        }
        
        return response;
    }
    
    @Transactional
    public void updateTurnoMedico(String codigo, TurnoMedicoRequestDto dto) {
        Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigo(codigo);
        if (optionalturnoMedico.isPresent()) {
        	
        	DataValidator.validateDtoFields(dto);

			if (!TurnoMedicoValidator.validateRequestDto(dto)) {
				throw new InvalidMedicamentoData("Los datos de turno medico enviados son erroneos");
			}
        	
            TurnoMedico turnoMedico = optionalturnoMedico.get();
            
            turnoMedico.setEstado(dto.getEstado());
            turnoMedico.setFecha(dto.getFecha());
            turnoMedico.setHora(dto.getHora());
            turnoMedico.setMinutos(dto.getMinutos());
            turnoMedico.setMotivoConsulta(dto.getMotivoConsulta());
            turnoMedico.setRecetaMedica(recetaMedicaFactory.createEntityFromDto(dto.getRecetaMedica()));
            turnoMedico.setMedico(medicoFactory.createEntityFromDto(dto.getMedico()));
            turnoMedico.setSocio(socioFactory.createEntityFromDto(dto.getSocio()));
            
        } else {
            throw new TurnoMedicoNotFoundException("turnoMedico no encontrado");
        }
    }
    
    @Transactional
    public void deleteTurnoMedico(String codigo) {
        int updatedRows = this.turnoMedicoRepository.update("estado = ?1, estaDisponible = ?2 WHERE codigo = ?3", TurnoMedicoEstadoEnum.CANCELADA, 1, codigo);
        if (updatedRows == 0) {
            throw new TurnoMedicoNotFoundException("turnoMedico no encontrado");
        }
    }
	
}
