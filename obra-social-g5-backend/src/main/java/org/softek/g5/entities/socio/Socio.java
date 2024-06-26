package org.softek.g5.entities.socio;
import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.persona.Persona;
import org.softek.g5.entities.turnoMedico.TurnoMedico;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "socios")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class Socio extends Persona{
	@Column(name="num_afiliado")
	@NotNull
	private String nroAfiliado;
	
	@JsonIgnore
    @OneToMany(mappedBy="socio", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Beneficiario> beneficiarios;

	@JsonIgnore
	@OneToMany(mappedBy="socio", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TurnoMedico> turnos;
	
	@Builder
	public Socio(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, @NotNull String nroAfiliado, List<Beneficiario> beneficiarios,
			List<TurnoMedico> turnos) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.nroAfiliado = nroAfiliado;
		this.beneficiarios = beneficiarios;
		this.turnos = turnos;
	}
}
