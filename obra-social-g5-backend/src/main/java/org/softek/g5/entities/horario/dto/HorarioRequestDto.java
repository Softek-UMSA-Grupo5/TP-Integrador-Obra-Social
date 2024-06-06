package org.softek.g5.entities.horario.dto;

import java.time.LocalTime;

import org.softek.g5.entities.horario.Horario;

import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.validation.constraints.NotNull;
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
@RegisterForReflection
public class HorarioRequestDto {
	@NotNull
    private Horario.DiaSemana diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;
}