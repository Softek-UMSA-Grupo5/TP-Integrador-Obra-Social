package org.softek.g5.controllers;

import java.util.Collection;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.exceptions.CustomHttpException;
import org.softek.g5.services.RecetaMedicaService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
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
import lombok.AllArgsConstructor;

@Path("/recetas")
@Blocking
@AllArgsConstructor
public class RecetaMedicaController {

	@Inject
	RecetaMedicaService RecetaMedicaService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Obtener todas las recetas médicas", description = "Devuelve una lista de todas las recetas médicas")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Lista de recetas médicas"),
	    @APIResponse(responseCode = "500", description = "Error al obtener las recetas médicas")
	})
	public Response getAll() {
	    try {
	        Collection<RecetaMedicaResponseDto> recetas = this.RecetaMedicaService.getRecetaMedica();
	        return Response.ok(recetas).build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al obtener las recetas médicas", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Añadir receta médica", description = "Añade y persiste una receta médica")
	@APIResponses({
	    @APIResponse(responseCode = "201", description = "Receta médica añadida y persistida"),
	    @APIResponse(responseCode = "500", description = "Error al añadir y persistir la receta médica")
	})
	@Transactional
	public Response addRecetaMedica(@Valid RecetaMedicaRequestDto dto,
	                                @Valid @QueryParam("codigoTurno") String codigoTurno) {
	    try {
	        RecetaMedicaResponseDto response = this.RecetaMedicaService.persistRecetaMedica(codigoTurno, dto);
	        return Response.status(Response.Status.CREATED).entity(response).build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al añadir y persistir la receta médica", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@PUT
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Actualizar receta médica", description = "Actualiza una receta médica existente")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Receta médica actualizada"),
	    @APIResponse(responseCode = "500", description = "Error al actualizar la receta médica")
	})
	public Response update(@PathParam("codigo") String codigo, @Valid RecetaMedicaRequestDto dto) {
	    try {
	        RecetaMedicaService.updateRecetaMedica(codigo, dto);
	        return Response.ok().build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al actualizar la receta médica", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@DELETE
	@Path("/{codigo}")
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Eliminar receta médica", description = "Elimina una receta médica existente")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Receta médica eliminada"),
	    @APIResponse(responseCode = "500", description = "Error al eliminar la receta médica")
	})
	public Response delete(@PathParam("codigo") String codigo) {
	    try {
	        this.RecetaMedicaService.deleteRecetaMedica(codigo);
	        return Response.ok().build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al eliminar la receta médica", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}
	
}
