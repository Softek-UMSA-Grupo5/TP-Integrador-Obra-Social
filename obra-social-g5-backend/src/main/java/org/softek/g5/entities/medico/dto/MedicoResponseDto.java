package org.softek.g5.entities.medico.dto;

import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;

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
public class MedicoResponseDto {
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private String cuil;
	private Date fechaNacimiento;
	private Boolean estaEliminado;
	private String especialidad;
	private List<ConsultorioResponseDto> consultorios;
	private List<TurnoMedicoResponseDto> turnos;
}
