package org.softek.g5.entities.medico;
import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.persona.Persona;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.security.usuario.Usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	
	@JsonIgnore
	@OneToMany(mappedBy="medico", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TurnoMedico> turnos;
	
	@OneToMany(mappedBy="medico", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Consultorio> consultorios;
	
	@OneToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@Builder
	public Medico(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, String especialidad, String consultorio, List<TurnoMedico> turnos, List<Consultorio> consultorios, Usuario usuario) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.especialidad = especialidad;
		this.turnos = turnos;
		this.consultorios = consultorios;
		this.usuario = usuario;
	}
}
