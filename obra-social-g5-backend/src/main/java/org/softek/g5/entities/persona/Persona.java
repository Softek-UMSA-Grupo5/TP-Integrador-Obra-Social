package org.softek.g5.entities.persona;
import java.sql.Date;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class Persona extends PanacheEntityBase{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	protected String nombre;
	protected String apellido;
	protected String telefono;
	protected String email;
	@Column(unique = true, nullable = false)
	protected int dni;
	@Column(unique = true, nullable = false)
	protected String cuil;
	@Column(name="fecha_nacimiento")
	protected Date fechaNacimiento;
	protected Boolean estaEliminado;
}
