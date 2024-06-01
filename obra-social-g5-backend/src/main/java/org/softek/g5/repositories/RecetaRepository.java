package org.softek.g5.repositories;

import org.softek.g5.entities.receta.Receta;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecetaRepository implements PanacheRepositoryBase<Receta, Long>{
	
}
