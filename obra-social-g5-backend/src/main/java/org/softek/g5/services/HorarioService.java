package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.exceptions.entitiesCustomException.HorarioNotFoundException;
import org.softek.g5.repositories.HorarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class HorarioService {

    private final HorarioRepository horarioRepository;

    public List<HorarioResponseDto> getAllHorarios() {
        List<Horario> horarios = horarioRepository.listAll();
        return horarios.stream()
                .filter(horario -> !horario.isEstaEliminado())
                .map(HorarioFactory::toDto)
                .collect(Collectors.toList());
    }

    public List<HorarioResponseDto> getAllHorariosDeleted() {
        List<Horario> horariosEliminados = horarioRepository.listAll();
        return horariosEliminados.stream()
                .filter(Horario::isEstaEliminado)
                .map(HorarioFactory::toDto)
                .collect(Collectors.toList());
    }

    public HorarioResponseDto getHorarioByCodigo(String codigo) {
        return horarioRepository.find("codigo", codigo)
                .firstResultOptional()
                .filter(horario -> !horario.isEstaEliminado())
                .map(HorarioFactory::toDto)
                .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));
    }

    @Transactional
    public HorarioResponseDto createHorario(@Valid HorarioRequestDto dto) {
        Horario horario = HorarioFactory.toEntity(dto);
        horario.setEstaEliminado(false);
        horarioRepository.persist(horario);
        return HorarioFactory.toDto(horario);
    }

    @Transactional
    public HorarioResponseDto updateHorario(String codigo, @Valid HorarioRequestDto dto) {
        Horario horario = horarioRepository.find("codigo", codigo)
                .firstResultOptional()
                .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));

        if (horario.isEstaEliminado()) {
            throw new HorarioNotFoundException("Horario no encontrado con código: " + codigo);
        }

        HorarioFactory.updateEntity(horario, dto);
        horarioRepository.persist(horario);
        return HorarioFactory.toDto(horario);
    }

    @Transactional
    public boolean deleteHorario(String codigo) {
        Horario horario = horarioRepository.find("codigo", codigo)
                .firstResultOptional()
                .orElseThrow(() -> new HorarioNotFoundException("Horario no encontrado con código: " + codigo));

        horario.setEstaEliminado(true);
        horarioRepository.persist(horario);
        return true;
    }

    @Transactional
    public Response restoreHorario(String codigo) {
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
    }
}