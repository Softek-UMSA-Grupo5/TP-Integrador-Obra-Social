package org.softek.g5.entities.recetaMedica;


import java.time.LocalDate;
import java.util.List;

import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.turnoMedico.TurnoMedico;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recetas_medicas")
@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class RecetaMedica extends PanacheEntityBase{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String codigo;
    private LocalDate fechaEmision;
    private LocalDate ultimaModificacion;
    private int cantDiasVigencia;
    private Boolean estaEliminado;
    
    @JsonIgnore
    @OneToMany(mappedBy="recetaMedica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medicamento> medicamentos;
    
    @OneToOne
    private TurnoMedico turno;
    
}
	