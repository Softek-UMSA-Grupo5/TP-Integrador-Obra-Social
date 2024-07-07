package org.softek.g5.entities.medico.dto;

import java.sql.Date;

import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;

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
	
	private Long id;
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private String cuil;
	private Date fechaNacimiento;
	private Boolean estaEliminado;
	private String especialidad;
	private Long usuario;
	private ConsultorioResponseDto consultorios;
	
}
