package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.softek.g5.entities.recetaMedica.RecetaMedicaFactory;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
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
	RecetaMedicaService recetaMedicaService;

	@Inject
	RecetaMedicaFactory recetaMedicaFactory;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Obtener todas las recetas médicas", description = "Devuelve una lista de todas las recetas médicas")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Lista de recetas médicas"),
			@APIResponse(responseCode = "500", description = "Error al obtener las recetas médicas") })
	public Response getAll() throws CustomServerException {

		Collection<RecetaMedicaResponseDto> recetas = recetaMedicaService.getRecetaMedica().stream()
				.map(recetaMedicaFactory::createResponseFromEntity).collect(Collectors.toList());
		recetaMedicaService.getRecetaMedica();

		return Response.ok(recetas).build();

	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Obtener la receta médica por id", description = "Devuelve la receta médica según el id proporcionado")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Receta medica encontrada"),
			@APIResponse(responseCode = "500", description = "Error al obtener la receta médica") })
	public Response getRecetaMedicaById(
			@Parameter(required = true, description = "id de la receta médica") @PathParam("id") Long idReceta)
			throws CustomServerException {

		RecetaMedicaResponseDto receta = recetaMedicaFactory
				.createResponseFromEntity(recetaMedicaService.getRecetaMedicaById(idReceta));

		return Response.ok(receta).build();

	}

	@GET
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Obtener la receta médica por código", description = "Devuelve la receta médica según el código proporcionado")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Receta medica encontrada"),
			@APIResponse(responseCode = "500", description = "Error al obtener la receta médica") })
	public Response getRecetaMedicaByCodigo(
			@Parameter(required = true, description = "código de la receta médica") @PathParam("codigo") String codigoReceta)
			throws CustomServerException {
		RecetaMedicaResponseDto receta = recetaMedicaFactory
				.createResponseFromEntity(recetaMedicaService.getRecetaMedicaByCodigo(codigoReceta));
		return Response.ok(receta).build();
	}

	@GET
	@Path("fechas")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Obtener todas las recetas médicas entre dos fechas", description = "Devuelve una lista de todas las recetas médicas emitidas entre las dos fechas proporcionadas")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Lista de recetas médicas"),
			@APIResponse(responseCode = "500", description = "Error al obtener las recetas médicas") })
	public Response getRecetaMedicaBetweenDates(
			@Parameter(required = true, description = "fecha desde") @QueryParam("fechaDesde") String fechaDesde,
			@Parameter(required = true, description = "fecha hasta") @QueryParam("fechaHasta") String fechaHasta)
			throws CustomServerException {
		List<RecetaMedicaResponseDto> recetas = recetaMedicaService.getRecetaMedicaBetweenDates(fechaDesde, fechaHasta).stream()
				.map(recetaMedicaFactory::createResponseFromEntity).collect(Collectors.toList());
		recetaMedicaService.getRecetaMedica();
			
		return Response.ok(recetas).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Añadir receta médica", description = "Añade y persiste una receta médica")
	@APIResponses({ @APIResponse(responseCode = "201", description = "Receta médica añadida y persistida"),
			@APIResponse(responseCode = "500", description = "Error al añadir y persistir la receta médica") })
	@Transactional
	public Response addRecetaMedica(@Valid RecetaMedicaRequestDto dto,
			@Parameter(required = true, description = "código turno medico") @QueryParam("codigoTurno") String codigoTurno)
			throws CustomServerException {
		RecetaMedicaResponseDto response = recetaMedicaFactory
				.createResponseFromEntity(recetaMedicaService.persistRecetaMedica(codigoTurno, dto));
		return Response.status(Response.Status.CREATED).entity(response).build();
	}

	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Actualizar receta médica", description = "Actualiza una receta médica existente")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Receta médica actualizada"),
			@APIResponse(responseCode = "500", description = "Error al actualizar la receta médica") })
	public Response update(
			@Parameter(required = true, description = "codigo de la receta médica") @PathParam("id") Long idReceta,
			@Valid RecetaMedicaUpdateRequestDto dto) throws CustomServerException {
		recetaMedicaService.updateRecetaMedica(idReceta, dto);
		return Response.ok().build();
	}

	@DELETE
	@Path("/{codigo}")
	@RolesAllowed({ "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Eliminar receta médica", description = "Elimina una receta médica existente")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Receta médica eliminada"),
			@APIResponse(responseCode = "500", description = "Error al eliminar la receta médica") })
	public Response delete(
			@Parameter(required = true, description = "código de la receta médica") @PathParam("codigo") String codigo)
			throws CustomServerException {
		recetaMedicaService.deleteRecetaMedica(codigo);
		return Response.ok().build();
	}

}
