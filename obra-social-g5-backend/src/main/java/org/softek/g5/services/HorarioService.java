package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.exceptions.entitiesCustomException.horario.HorarioNotFoundException;

import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;
import org.softek.g5.validation.entitiesValidation.HorarioValidator;

@ApplicationScoped
public class HorarioService {
    @Inject
    HorarioRepository horarioRepository;
    @Inject
    ConsultorioRepository consultorioRepository;



    public List<HorarioResponseDto> getAllHorarios() throws CustomServerException {
        try {
            List<Horario> horarios = horarioRepository.listAll();
            if (horarios.isEmpty()) {
                throw new EntityNotFoundException("Aún no hay registro de horarios");
            }
            return horarios.stream()
                    .filter(horario -> !horario.isEstaEliminado())
                    .map(HorarioFactory::toDto)
                    .collect(Collectors.toList());
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al obtener todos los horarios");
        }
    }

    public List<HorarioResponseDto> getAllHorariosDeleted() throws CustomServerException{
        try {
            List<Horario> horarios = horarioRepository.listAll();
            if (horarios.isEmpty()){
                throw new EntityNotFoundException("Aún no hay registro de horarios");
            }
            List <HorarioResponseDto> horariosEliminados = horarios.stream().filter(Horario::isEstaEliminado).map(HorarioFactory::toDto).toList();
            if (horariosEliminados.isEmpty()){
                throw new EntityNotFoundException("No hay registro de horarios eliminados");
            }
            return horariosEliminados;
        }catch (EntityNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new CustomServerException("Error al obtener todos los horarios eliminados");
        }
    }

    public HorarioResponseDto getHorarioByCodigo(String codigo) throws CustomServerException{
        try {
            return horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .filter(horario -> !horario.isEstaEliminado())
                    .map(HorarioFactory::toDto)
                    .orElseThrow(() -> new EntityNotFoundException("Horario no encontrado"));
        }catch (EntityNotFoundException e) {
            throw e;
        }
        catch (Exception e) {
            throw new CustomServerException("Error al obtener el horario por código");
        }
    }
    
    public void createHorario(HorarioRequestDto dto, UbicacionRequestDto ubicacionConsultorio) throws CustomServerException{

        Horario horario = HorarioFactory.toEntity(dto);
        Consultorio consultorio = consultorioRepository.findByUbicacion(
                ubicacionConsultorio.getCiudad(),
                ubicacionConsultorio.getProvincia(),
                ubicacionConsultorio.getCalle(),
                ubicacionConsultorio.getAltura()
        );

        if (consultorio == null) {
            throw new CustomServerException("No se encontró ningún consultorio para la ubicación proporcionada");
        }

        horario.setConsultorio(consultorio);
    }
   
    @Transactional
    public HorarioResponseDto updateHorario(String codigo, @Valid HorarioRequestDto dto) throws CustomServerException{
        try{
            Horario horario = horarioRepository.findByCodigo(codigo);
            if (horario == null){
                throw new EntityNotFoundException("Horario no encontrado");
            }

            if (horario.isEstaEliminado()) {
                throw new EntityNotFoundException("El horario está eliminado");
            }

            HorarioFactory.updateEntity(horario, dto);
            horarioRepository.persist(horario);
            return HorarioFactory.toDto(horario);
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e){
            throw new CustomServerException("Error al actualizar horario");
        }
    }

    @Transactional
    public Response deleteHorario(String codigo) throws CustomServerException{
        try {
            Horario horario = horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new EntityNotFoundException("Horario no encontrado"));

            horario.setEstaEliminado(true);
            horarioRepository.persist(horario);
            return Response.status(Response.Status.NO_CONTENT).build();
        }catch(EntityNotFoundException e){
            throw e;
       }catch (Exception e) {
            throw new CustomServerException("Error al eliminar el horario", e);
        }
    }

    @Transactional
    public Response restoreHorario(String codigo) throws CustomServerException{
        try {
            Horario horario = horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new EntityNotFoundException("Horario no encontrado con código: " + codigo));

            if (horario.isEstaEliminado()) {
                horario.setEstaEliminado(false);
                horarioRepository.persist(horario);
                return Response.ok("Horario restaurado con éxito.").build();
            } else {
                throw new EntityNotFoundException("El horario no está eliminado");
            }
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new ServiceException("Error al restaurar el horario", e);
        }
    }
    public HorarioResponseDto findByCodigo(String codigo) {
    	Horario horario = (Horario) horarioRepository.find("codigo", codigo);
    	HorarioResponseDto dto = HorarioFactory.toDto(horario);
    	return dto;
    }
}
