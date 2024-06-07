package org.softek.g5.entities.medico;
import java.sql.Date;

import org.softek.g5.entities.persona.Persona;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medicos")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class Medico extends Persona{
	private String especialidad;
	private String consultorio;
	
	@Builder
	public Medico(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, String especialidad, String consultorio) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.especialidad = especialidad;
		this.consultorio = consultorio;
	}
}
