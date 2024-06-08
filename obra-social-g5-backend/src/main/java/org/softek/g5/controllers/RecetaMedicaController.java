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
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;
import lombok.AllArgsConstructor;

@Path("/recetas")
@Blocking
@AllArgsConstructor
public class RecetaMedicaController {

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
	public RecetaMedicaResponseDto addRecetaMedica(@Valid RecetaMedicaRequestDto dto,
			@Valid @QueryParam("codigoTurno") String codigoTurno) {
		RecetaMedicaResponseDto response = this.RecetaMedicaService.persistRecetaMedica(codigoTurno, dto);
		return response;
	}

	@PUT
	@Path("/{codigo}")
	public ResponseBuilder update(@PathParam("codigo") String codigo
			, RecetaMedicaRequestDto dto) {
		RecetaMedicaService.updateRecetaMedica(codigo, dto);
		return Response.ok();
	}

	@DELETE
	@Path("/{codigo}")
	public void delete(@PathParam("codigo") String codigo) {
		this.RecetaMedicaService.deleteRecetaMedica(codigo);
	}
	
}
