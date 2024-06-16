package org.softek.g5.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.recetaMedica.RecetaMedica;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class RecetaMedicaRepository implements PanacheRepositoryBase<RecetaMedica, Long>{
	
	public Optional<RecetaMedica> findByCodigo(String codigo){
		return find("codigo", codigo).firstResultOptional();
	}
	
	public List<RecetaMedica> findBetweenDates(LocalDate fechaDesde, LocalDate fechaHasta){
		return find("fechaEmision BETWEEN ?1 AND ?2", fechaDesde, fechaHasta).list();
	}
	
}
