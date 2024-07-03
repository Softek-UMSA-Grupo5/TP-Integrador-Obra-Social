package org.softek.g5.entities.recepcionista;

import java.sql.Date;

import org.softek.g5.entities.persona.Persona;
import org.softek.g5.security.usuario.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recepcionistas")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class Recepcionista extends Persona{

	@OneToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@Builder
	public Recepcionista(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, Usuario usuario) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.usuario = usuario;
	}
	
}
