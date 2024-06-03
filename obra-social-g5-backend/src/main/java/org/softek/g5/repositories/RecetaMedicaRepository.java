package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.recetaMedica.RecetaMedica;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecetaMedicaRepository implements PanacheRepositoryBase<RecetaMedica, Long>{
	
	public Optional<RecetaMedica> findByCodigo(String codigo){
		return find("codigo", codigo).firstResultOptional();
	}
	
}
