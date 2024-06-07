package org.softek.g5.entities.ubicacion;

import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ubicaciones")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ubicacion extends PanacheEntityBase{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Ciudad no puede estar vacía")
	private String ciudad;
	@NotBlank(message = "Provincia no puede estar vacía")
	private String provincia;
	@NotBlank(message = "Direccion no puede estar vacía")
	private String direccion;
	@NotNull
	private int altura;
	private boolean estaEliminado;
	
	@Column(unique = true)
    private String codigo;
	
	@PrePersist
    protected void generarCodigo() {
        this.codigo = UUID.randomUUID().toString().substring(0, 5);
	}
}
