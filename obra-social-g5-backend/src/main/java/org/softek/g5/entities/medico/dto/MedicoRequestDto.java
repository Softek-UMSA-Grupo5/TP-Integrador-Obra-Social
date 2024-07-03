package org.softek.g5.entities.medico.dto;

import java.sql.Date;
import java.util.List;

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
public class MedicoRequestDto {
	
	@NotNull
	private String nombre;
	@NotNull
	private String apellido;
	@NotNull
	private String telefono;
	@NotNull
	private String email;
	@NotNull
	private int dni;
	@NotNull
	private Date fechaNacimiento;
	@NotNull
	private String cuil;
	@NotNull
	private String especialidad;
	private Long usuarioId;
	private List<Long> consultoriosId;
	
}
