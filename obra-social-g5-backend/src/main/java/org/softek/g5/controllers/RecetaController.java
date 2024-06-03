package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.services.RecetaMedicaService;

import io.smallrye.common.annotation.Blocking;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.AllArgsConstructor;

@Path("/recetas")
@Blocking
@AllArgsConstructor
public class RecetaController {

	@Inject
	RecetaMedicaService RecetaMedicaService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RecetaMedicaResponseDto> getAll() {
		return this.RecetaMedicaService.getRecetaMedica();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional
	public Collection<RecetaMedicaResponseDto> addRecetaMedica(@Valid List<RecetaMedicaRequestDto> dtos) {
		Collection<RecetaMedicaResponseDto> response = this.RecetaMedicaService.persistRecetaMedica(dtos);
		return response;
	}

	@PUT
	@Path("/{id}")
	public RecetaMedicaResponseDto update(@Parameter(required = true, description = "RecetaMedica name") @PathParam("id") Long id, RecetaMedicaRequestDto dto) {
		return RecetaMedicaService.updateRecetaMedica(id, dto);
	}

	@DELETE
	@Path("/{id}")
	public void delete(@Parameter(required = true, description = "RecetaMedica name") @PathParam("nombre") Long id) {
		this.RecetaMedicaService.deleteRecetaMedica(id);
	}
	
}
