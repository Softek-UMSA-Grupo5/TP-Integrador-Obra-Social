package org.softek.g5.entities.horario;

import java.time.LocalTime;
import java.util.UUID;

import org.softek.g5.entities.consultorio.Consultorio;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "horarios")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Horario extends PanacheEntityBase{

	public enum DiaSemana {
        LUNES, MARTES, MIERCOLES, JUEVES, VIERNES
    }
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Enumerated(EnumType.STRING)
	private DiaSemana diaSemana;
	@NotNull(message = "La hora de inicio no puede estar vacía")
	private LocalTime horaInicio;
	@NotNull(message = "La hora de fin no puede estar vacía")
	private LocalTime horaFin;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultorio_id")
    private Consultorio consultorio;
	
	private boolean estaEliminado;
	
	@Column(unique = true)
    private String codigo;
	
	@PrePersist
    protected void generarCodigo() {
        this.codigo = UUID.randomUUID().toString().substring(0, 5);
	}
}
