package org.softek.g5.repositories;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.turnoMedico.TurnoMedico;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TurnoMedicoRepository implements PanacheRepositoryBase<TurnoMedico, Long>{

	public Optional<TurnoMedico> findByCodigo(String codigo) {
		return find("codigo", codigo).firstResultOptional();
	} 
	
	public List<TurnoMedico> findByTurno(Long id) {
		return find("turno.id = ?1 ", id).list();
	}
	
}
