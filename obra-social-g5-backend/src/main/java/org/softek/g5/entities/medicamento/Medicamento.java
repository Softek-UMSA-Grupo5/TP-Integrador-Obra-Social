package org.softek.g5.entities.medicamento;

import org.softek.g5.entities.recetaMedica.RecetaMedica;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Medicamento extends PanacheEntityBase{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicacion;
    private String posología;
    private String frecuencia;
    private String duracion;
    private String instrucciones;
    private Boolean estaEliminado;
	
}
