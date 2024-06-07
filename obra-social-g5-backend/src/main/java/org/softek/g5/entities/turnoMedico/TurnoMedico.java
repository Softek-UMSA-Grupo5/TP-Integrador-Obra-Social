package org.softek.g5.entities.turnoMedico;

import java.time.LocalDate;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "turno_medico")
@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TurnoMedico extends PanacheEntityBase{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String codigo;
	private LocalDate fecha;
	private int hora;
	private int minutos;
	private TurnoMedicoEstadoEnum estado;
	private String motivoConsulta;
	
	//@OneToOne(cascade = CascadeType.ALL)
	//private RecetaMedica recetaMedica;
	
}
