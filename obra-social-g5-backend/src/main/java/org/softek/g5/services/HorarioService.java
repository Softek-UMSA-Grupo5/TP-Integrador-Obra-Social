package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.exceptions.entitiesCustomException.HorarioNotFoundException;
import org.softek.g5.repositories.HorarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class HorarioService {
    @Inject
    HorarioRepository horarioRepository;

    public List<HorarioResponseDto> getAllHorarios() {
        try {
            List<Horario> horarios = horarioRepository.listAll();
            return horarios.stream()
                    .filter(horario -> !horario.isEstaEliminado())
                    .map(HorarioFactory::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Error al obtener todos los horarios", e);
        }
    }

    public List<HorarioResponseDto> getAllHorariosDeleted() {
        try {
            List<Horario> horariosEliminados = horarioRepository.listAll();
            return horariosEliminados.stream()
                    .filter(Horario::isEstaEliminado)
                    .map(HorarioFactory::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Error al obtener todos los horarios eliminados", e);
        }
    }

    public HorarioResponseDto getHorarioByCodigo(String codigo) {
        try {
            return horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .filter(horario -> !horario.isEstaEliminado())
                    .map(HorarioFactory::toDto)
                    .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));
        } catch (Exception e) {
            throw new ServiceException("Error al obtener el horario por código", e);
        }
    }
    
    @Transactional
    public Response createHorario(@Valid HorarioRequestDto dto) {
        try {
            Horario horario = HorarioFactory.toEntity(dto);
            horario.setEstaEliminado(false);
            horarioRepository.persist(horario);
            return Response.status(Response.Status.CREATED).entity(HorarioFactory.toDto(horario)).build();
        } catch (Exception e) {
            throw new ServiceException("Error al crear el horario: ", e);
        }
    }
   
    @Transactional
    public HorarioResponseDto updateHorario(String codigo, @Valid HorarioRequestDto dto) {
        try {
            Horario horario = horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));

            if (horario.isEstaEliminado()) {
                throw new HorarioNotFoundException("Horario no encontrado con código: " + codigo);
            }

            HorarioFactory.updateEntity(horario, dto);
            horarioRepository.persist(horario);
            return HorarioFactory.toDto(horario);
        } catch (Exception e) {
            throw new ServiceException("Error al actualizar el horario", e);
        }
    }

    @Transactional
    public Response deleteHorario(String codigo) {
        try {
            Horario horario = horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));

            horario.setEstaEliminado(true);
            horarioRepository.persist(horario);
            return Response.ok("Horario eliminado con éxito.").build();
        } catch (Exception e) {
            throw new ServiceException("Error al eliminar el horario", e);
        }
    }

    @Transactional
    public Response restoreHorario(String codigo) {
        try {
            Horario horario = horarioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));

            if (horario.isEstaEliminado()) {
                horario.setEstaEliminado(false);
                horarioRepository.persist(horario);
                return Response.ok("Horario restaurado con éxito.").build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity("El horario no está eliminado.").build();
            }
        } catch (Exception e) {
            throw new ServiceException("Error al restaurar el horario", e);
        }
    }
}
