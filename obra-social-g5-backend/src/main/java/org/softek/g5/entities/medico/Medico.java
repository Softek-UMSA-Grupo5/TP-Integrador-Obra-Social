package org.softek.g5.entities.medico;
import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.persona.Persona;
import org.softek.g5.entities.turnoMedico.TurnoMedico;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
	
	@ManyToMany
	private List<Consultorio> consultorios;
	
	@Builder
	public Medico(Long id, String nombre, String apellido, String telefono, String email, int dni, String cuil,
			Date fechaNacimiento, Boolean estaEliminado, String especialidad, String consultorio, List<TurnoMedico> turnos, List<Consultorio> consultorios) {
		super(id, nombre, apellido, telefono, email, dni, cuil, fechaNacimiento, estaEliminado);
		this.especialidad = especialidad;
		this.turnos = turnos;
		this.consultorios = consultorios;
	}
}