package org.softek.g5.services;

import java.util.Collection;

import org.softek.g5.entities.receta.Receta;
import org.softek.g5.repositories.RecetaRepository;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class RecetaService {

	private final RecetaRepository recetaRepository;
	
	public Collection<Receta> getRecetas() {
		return this.recetaRepository.listAll();
	}
	
	public Receta addReceta(Receta receta) {
		this.recetaRepository.persist(receta);
		return receta;
	}
	
}
