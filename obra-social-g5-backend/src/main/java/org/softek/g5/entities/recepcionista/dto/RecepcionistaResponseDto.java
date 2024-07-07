package org.softek.g5.entities.recepcionista.dto;

import java.sql.Date;

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
public class RecepcionistaResponseDto {

	private Long id;
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private String cuil;
	private Date fechaNacimiento;
	private Boolean estaEliminado;
	private Long usuarioId;

}
