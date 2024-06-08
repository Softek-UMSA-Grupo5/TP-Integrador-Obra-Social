package org.softek.g5.entities.medico.dto;

import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;

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
public class MedicoRequestDto {
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private Date fechaNacimiento;
	private String cuil;
	private String especialidad;
	private List<ConsultorioRequestDto> consultorios;
}
