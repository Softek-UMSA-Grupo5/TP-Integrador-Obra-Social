package org.softek.g5.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.TurnoMedicoNotFoundException;
import org.softek.g5.repositories.TurnoMedicoRepository;

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
        // Agregar validaciones si es necesario
        Collection<TurnoMedicoResponseDto> response = new ArrayList<>();
        for (TurnoMedicoRequestDto dto : dtos) {
            TurnoMedico turnoMedico = turnoMedicoFactory.createEntityFromDto(dto);
            Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigo(turnoMedico.getCodigo());
			if(optionalturnoMedico.isPresent()) {
				throw new RuntimeException("Este turno ya existe");
			}
            this.turnoMedicoRepository.persist(turnoMedico);
            //this.medicamentoService.persistMedicamento(turnoMedico.getCodigo(), dto.getMedicamentos());
            response.add(turnoMedicoFactory.createResponseFromEntity(turnoMedico));
        }
        
        return response;
    }
    
    @Transactional
    public void updateTurnoMedico(String codigo, TurnoMedicoRequestDto dto) {
        Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigo(codigo);
        if (optionalturnoMedico.isPresent()) {
            TurnoMedico turnoMedico = optionalturnoMedico.get();
            
            turnoMedico.setId(optionalturnoMedico.get().getId());
            turnoMedico.setEstado(dto.getEstado());
            turnoMedico.setFecha(dto.getFecha());
            turnoMedico.setHora(dto.getHora());
            turnoMedico.setMinutos(dto.getMinutos());
            turnoMedico.setMotivoConsulta(dto.getMotivoConsulta());
            /*try {
                //BeanUtils.copyProperties(turnoMedico, dto);
                
                

            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException("Error al copiar propiedades", e);
            }*/
            
            //return this.turnoMedicoFactory.createResponseFromEntity(turnoMedico);
        } else {
            throw new TurnoMedicoNotFoundException("turnoMedico no encontrado");
        }
    }
    
    @Transactional
    public void deleteTurnoMedico(String codigo) {
        int updatedRows = this.turnoMedicoRepository.update("estado = ?1 WHERE codigo = ?2", TurnoMedicoEstadoEnum.CANCELADA, codigo);
        if (updatedRows == 0) {
            throw new TurnoMedicoNotFoundException("turnoMedico no encontrado");
        }
    }
	
}
