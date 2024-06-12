package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.exceptions.CustomServerException;
import org.softek.g5.services.MedicamentoService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
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

@Path("/medicamentos")
@Blocking
@AllArgsConstructor
public class MedicamentoController {

	@Inject
	MedicamentoService medicamentoService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "USER", "ADMIN" })
	@Operation(summary = "Obtener medicamentos", description = "devuelve una lista de medicamentos")
	@APIResponse(responseCode = "200", description = "lista de medicamentos")
	@APIResponse(responseCode = "404", description = "no hay medicamentos registrados")
	public Response getAll() throws CustomServerException {

		Collection<MedicamentoResponseDto> medicamentos = medicamentoService.getMedicamentos();
		return Response.ok(medicamentos).build();

	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ADMIN" })
	@Operation(summary = "Añadir medicamentos", description = "Añade y persiste una lista de medicamentos")
	@APIResponse(responseCode = "201", description = "lista de medicamentos añadido y persistido")
	@APIResponse(responseCode = "500", description = "No se pudo añadir y persistir la lista de medicamentos por un error del servidor")
	public Response addRecetaMedica(@Valid @QueryParam("codigoReceta") String codigoReceta,
			@Valid List<MedicamentoRequestDto> dtos) throws CustomServerException {

		Collection<MedicamentoResponseDto> response = this.medicamentoService.persistMedicamento(codigoReceta, dtos);
		return Response.status(Response.Status.CREATED).entity(response).build();

	}

	@PUT
	@Path("/{nombre}")
	@RolesAllowed({ "USER", "ADMIN" })
	@Operation(summary = "Actualizar medicamento", description = "Actualiza un medicamento de una receta")
	@APIResponse(responseCode = "200", description = "medicamento actualizado")
	@APIResponse(responseCode = "500", description = "No se pudo actualizar el medicamento por un error del servidor")
	public Response update(
			@Parameter(required = true, description = "Nombre del medicamento") @PathParam("nombre") String codigoMedicamento,
			@Valid @QueryParam("idReceta") Long idReceta, MedicamentoRequestDto dto) throws CustomServerException {

		MedicamentoResponseDto updatedMedicamento = medicamentoService.updateMedicamento(codigoMedicamento, idReceta,
				dto);
		return Response.ok(updatedMedicamento).build();

	}

	@DELETE
	@Path("/{nombre}")
	@RolesAllowed({ "USER", "ADMIN" })
	@Operation(summary = "Eliminar medicamento", description = "Elimina un medicamento de una receta")
	@APIResponse(responseCode = "200", description = "medicamento eliminado")
	@APIResponse(responseCode = "500", description = "No se pudo eliminar el medicamento por un error del servidor")
	public Response delete(
			@Parameter(required = true, description = "Nombre del medicamento") @PathParam("nombre") String codigoMedicamento,
			@Valid @QueryParam("idReceta") Long idReceta) throws CustomServerException {

		this.medicamentoService.deleteMedicamento(codigoMedicamento, idReceta);
		return Response.ok().build();

	}

}
