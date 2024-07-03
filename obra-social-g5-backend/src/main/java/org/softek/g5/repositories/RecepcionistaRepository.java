package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.recepcionista.Recepcionista;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecepcionistaRepository implements PanacheRepositoryBase<Recepcionista, Long> {
	/*public Optional<Recepcionista> findByDni(int dni) {
		return find("dni AND estaEliminado = 0", dni).firstResultOptional();
	}*/
	public Optional<Recepcionista> findByDni(int dni) {
		return find("dni = ?1 AND estaEliminado = false", dni).firstResultOptional();
	}

	public Optional<Recepcionista> findByUser(Long id) {
		return find("usuario.id = ?1", id).firstResultOptional();
	}
}
