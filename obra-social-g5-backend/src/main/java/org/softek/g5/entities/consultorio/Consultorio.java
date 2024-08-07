package org.softek.g5.entities.consultorio;

import java.util.List;
import java.util.UUID;

import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.ubicacion.Ubicacion;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "consultorios")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Consultorio extends PanacheEntityBase{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(mappedBy = "consultorio", fetch = FetchType.EAGER)
	private List<Horario> horarioAtencion;
	
	@ManyToOne
    @JoinColumn(name = "ubicacion_id", nullable = false)
    private Ubicacion ubicacion;
	private boolean estaEliminado;
	
	@Column(unique = true)
    private String codigo;
	
	@ManyToOne
	private Medico medico;
	
	@PrePersist
    protected void generarCodigo() {
        this.codigo = UUID.randomUUID().toString().substring(0, 5);
	}
}
