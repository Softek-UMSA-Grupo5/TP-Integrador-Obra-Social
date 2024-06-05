package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.usuario.Usuario;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UsuarioRepository implements PanacheRepositoryBase<Usuario, Long>{

	public Optional<Usuario> findByUsername(String username){
		return find("username", username).firstResultOptional();
	}
	
}
