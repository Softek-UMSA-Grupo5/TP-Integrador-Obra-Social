package org.softek.g5.entities.beneficiario;
import java.sql.Date;

import org.softek.g5.entities.persona.Persona;
import org.softek.g5.entities.socio.Socio;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "beneficiarios")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class Beneficiario extends Persona{
	@ManyToOne
	private Socio socio;
	
	@Builder
	public Beneficiario(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, Socio socio) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.socio = socio;
	}
}
