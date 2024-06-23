package org.softek.g5.services;

import java.util.List;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityExistException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class HorarioService {
	
    @Inject
    HorarioRepository horarioRepository;
    @Inject
    ConsultorioRepository consultorioRepository;

    public List<Horario> getAllHorarios() throws CustomServerException {
        try {
            List<Horario> horarios = horarioRepository.listAll();
            
            if (horarios.isEmpty()) {
                throw new EntityNotFoundException("Aún no hay registro de horarios");
            }
            
            return horarios;
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al obtener todos los horarios");
        }
    }

    public Horario getHorarioByCodigo(String codigo) throws CustomServerException{
        try {
        	
        	Horario horario = horarioRepository.findByCodigo(codigo);
        	
        	if (horario == null) {
                throw new EntityNotFoundException("No hay registro de horario con código " + codigo);
            }
        	
            return horario;
            
        }catch (EntityNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new CustomServerException("Error al obtener el horario por código");
        }
    }
    
    public Horario createHorario(HorarioRequestDto dto, Long idConsultorio) throws CustomServerException{

        Horario horario = HorarioFactory.toEntity(dto);
        
        Consultorio consultorio = consultorioRepository.findById(idConsultorio);
        
        if (consultorio == null) {
            throw new CustomServerException("No se encontró ningún consultorio para la ubicación proporcionada");
        }
        
        Horario existHorario = horarioRepository.findByDetails(dto.getDiaSemana(), dto.getHoraInicio(), dto.getHoraFin(), consultorio.getId());
        
        if(existHorario != null){
        	throw new EntityExistException("Ya existe este horario para el consultorio");
        }

        horario.setConsultorio(consultorio);
        
        return horario;
    }
   
    @Transactional
    public Horario updateHorario(HorarioUpdateRequestDto dto) throws CustomServerException{
        try{
        	
            Horario horario = horarioRepository.findById(dto.getId());
            if (horario == null){
                throw new EntityNotFoundException("Horario no encontrado");
            }

            horario.setDiaSemana(dto.getDiaSemana());
            horario.setHoraInicio(dto.getHoraInicio());
            horario.setHoraFin(dto.getHoraFin());
            
            return horario;
            
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e){
            throw new CustomServerException("Error al actualizar horario");
        }
    }

    @Transactional
    public void deleteHorario(Long idHorario) throws CustomServerException{
        
    	try {

			int updatedRows = this.horarioRepository.update(
					"estaEliminado = true WHERE id = ?1", idHorario);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un medicamento");
		}
    	
    }

    @Transactional
    public void restoreHorario(Long idHorario) throws CustomServerException{
    	
    	try {

			int updatedRows = this.horarioRepository.update(
					"estaEliminado = false WHERE id = ?1", idHorario);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un medicamento");
		}
    	
    }
    
}
