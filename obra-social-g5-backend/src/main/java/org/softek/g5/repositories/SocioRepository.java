package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.socio.Socio;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SocioRepository implements PanacheRepositoryBase<Socio, Long> {
	public Optional<Socio> findByDni(int dni) {
		return find("dni AND estaEliminado = 0", dni).firstResultOptional();
	}

	public Optional<Socio> findByUser(Long id) {
		return find("usuario.id = ?1", id).firstResultOptional();
	}
}
