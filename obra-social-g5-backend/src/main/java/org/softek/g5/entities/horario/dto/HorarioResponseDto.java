package org.softek.g5.entities.horario.dto;

import java.time.LocalTime;

import org.softek.g5.entities.horario.Horario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HorarioResponseDto {
    private Horario.DiaSemana diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private boolean estaEliminado;
    private String codigo;
}