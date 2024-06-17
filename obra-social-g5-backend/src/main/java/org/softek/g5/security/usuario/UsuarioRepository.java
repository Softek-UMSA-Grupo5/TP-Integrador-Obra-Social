package org.softek.g5.security.usuario;

import java.util.Optional;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UsuarioRepository implements PanacheRepositoryBase<Usuario, Long>{

	public Optional<Usuario> findByUsername(String username){
		return find("username = ?1 and estaEliminado = false", username).firstResultOptional();
	}
	
	public Optional<Usuario> findUser(String username, String password){
		return find("username = ?1 and password = ?2 and estaEliminado = false", username, password).firstResultOptional();
	}
}
