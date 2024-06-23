package org.softek.g5.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.turnoMedico.TurnoMedico;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TurnoMedicoRepository implements PanacheRepositoryBase<TurnoMedico, Long>{

	public Optional<TurnoMedico> findByCodigo(String codigo) {
		return find("codigo = ?1 AND estaDisponible = false", codigo).firstResultOptional();
	} 
	
	public List<TurnoMedico> findByTurno(Long id) {
		return find("turno.id = ?1 ", id).list();
	}
	
	public List<TurnoMedico> findBySocio(Long idSocio) {
		return find("socio.id", idSocio).list();
	} 
	
	public List<TurnoMedico> findByMedico(Long idMedico) {
		return find("medico.id", idMedico).list();
	} 
	
	public List<TurnoMedico> findBetweenDates(LocalDate fechaDesde, LocalDate fechaHasta){
		return find("fecha BETWEEN ?1 AND ?2", fechaDesde, fechaHasta).list();
	}
	
}
