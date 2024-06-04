package org.softek.g5.entities.consultorio;

import java.util.List;
import java.util.stream.Collectors;

import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ConsultorioFactory {
    
    public static Consultorio toEntity(ConsultorioRequestDto dto) {
        Ubicacion ubicacionEntity = UbicacionFactory.toEntity(dto.getUbicacion());
        List<Horario> horarios = dto.getHorarioAtencion().stream()
            .map(HorarioFactory::toEntity)
            .collect(Collectors.toList());

        return Consultorio.builder()
            .ubicacion(ubicacionEntity)
            .horarioAtencion(horarios)
            .build();
    }

    public static ConsultorioResponseDto toDto(Consultorio consultorio) {
        List<HorarioResponseDto> horariosDto = consultorio.getHorarioAtencion().stream()
            .map(HorarioFactory::toDto)
            .collect(Collectors.toList());

        UbicacionResponseDto ubicacionDto = UbicacionFactory.toDto(consultorio.getUbicacion());

        return ConsultorioResponseDto.builder()
            .codigo(consultorio.getCodigo())
            .horarioAtencion(horariosDto)
            .ubicacion(ubicacionDto)
            .estaEliminado(consultorio.isEstaEliminado())
            .build();
    }
}

