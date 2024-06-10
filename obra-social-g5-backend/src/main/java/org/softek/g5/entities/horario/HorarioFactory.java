package org.softek.g5.entities.horario;

import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HorarioFactory {
    
     public static Horario toEntity(HorarioRequestDto dto) {
            return Horario.builder()
                    .diaSemana(dto.getDiaSemana())
                    .horaInicio(dto.getHoraInicio())
                    .horaFin(dto.getHoraFin())
                    .estaEliminado(false)
                    .build();
        }

        public static HorarioResponseDto toDto(Horario horario) {
            return HorarioResponseDto.builder()
                    .codigo(horario.getCodigo())
                    .diaSemana(horario.getDiaSemana())
                    .horaInicio(horario.getHoraInicio())
                    .horaFin(horario.getHoraFin())
                    .estaEliminado(horario.isEstaEliminado())
                    .build();
        }

        public static void updateEntity(Horario horario , HorarioRequestDto dto) {
            horario.setDiaSemana(dto.getDiaSemana());
            horario.setHoraInicio(dto.getHoraInicio());
            horario.setHoraFin(dto.getHoraFin());
        }
}