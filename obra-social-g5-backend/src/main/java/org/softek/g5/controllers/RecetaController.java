package org.softek.g5.controllers;

import java.util.Collection;

import org.softek.g5.entities.receta.Receta;
import org.softek.g5.services.RecetaService;

import io.smallrye.common.annotation.Blocking;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.AllArgsConstructor;

@Path("/recetas")
@Blocking
@AllArgsConstructor
public class RecetaController {

	private final RecetaService recetaService;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Receta> getAll() {
		return this.recetaService.getRecetas();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional
	public Receta addReceta(@Valid Receta receta) {
		this.recetaService.addReceta(receta);
		return receta;
	}
	
}
