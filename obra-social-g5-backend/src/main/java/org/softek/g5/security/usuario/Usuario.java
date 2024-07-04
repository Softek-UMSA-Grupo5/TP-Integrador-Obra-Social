package org.softek.g5.security.usuario;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "usuario")
@EqualsAndHashCode(callSuper=false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario extends PanacheEntityBase{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String username;
	private String password;
	private String email;
	private UsuarioRolesEnum rol;
	private Boolean estaEliminado;
	private Boolean primerInicioSesion;
	
}
