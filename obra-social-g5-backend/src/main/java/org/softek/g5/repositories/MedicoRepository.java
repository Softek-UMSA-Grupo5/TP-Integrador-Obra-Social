package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.medico.Medico;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicoRepository implements PanacheRepositoryBase<Medico, Long>{
	public Optional<Medico> findByDni(int dni) {
		return find("dni", dni).firstResultOptional();
	}

	public Medico findByDniMedico(int dni) {
		return find("dni", dni).firstResult();
	}
	
	public Optional<Medico> findByUser(Long id) {
		return find("usuario.id = ?1", id).firstResultOptional();
	}
}
