package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
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
	@RolesAllowed({ "ROL_SOCIO", "ROL_ADMIN" })
	@Operation(summary = "Obtener medicamentos", description = "devuelve una lista de medicamentos")
	@APIResponse(responseCode = "200", description = "lista de medicamentos")
	@APIResponse(responseCode = "404", description = "no hay medicamentos registrados")
	public Response getAll() throws CustomServerException {

		List<MedicamentoResponseDto> medicamentos = medicamentoService.getMedicamentos();
		return Response.ok(medicamentos).build();

	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_ADMIN" })
	@Operation(summary = "Obtener medicamento por id", description = "devuelve el medicamento con el id proporcionado")
	@APIResponse(responseCode = "200", description = "medicamento encontrado")
	@APIResponse(responseCode = "404", description = "no se encontró el medicamento")
	public Response getMedicamentoById(@Parameter(required = true, description = "id del medicamento") @PathParam("id") Long id) throws CustomServerException {

		MedicamentoResponseDto medicamento = medicamentoService.getMedicamentosById(id);
		return Response.ok(medicamento).build();

	}
	
	@GET
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_ADMIN" })
	@Operation(summary = "Obtener medicamento por codigo", description = "devuelve los medicamentos con el código proporcionado")
	@APIResponse(responseCode = "200", description = "lista de medicamentos")
	@APIResponse(responseCode = "404", description = "no se encontrarón medicamentos")
	public Response getMedicamentoByCodigo(@Parameter(required = true, description = "codigo del medicamento") @PathParam("codigo") String codigo) throws CustomServerException {

		List<MedicamentoResponseDto> medicamentos = medicamentoService.getMedicamentosByCodigo(codigo);
		return Response.ok(medicamentos).build();

	}
	
	@GET
	@Path("/{receta}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_ADMIN" })
	@Operation(summary = "Obtener medicamento por receta", description = "devuelve los medicamentos con la receta proporcionada")
	@APIResponse(responseCode = "200", description = "lista de medicamentos")
	@APIResponse(responseCode = "404", description = "no se encontrarón medicamentos")
	public Response getMedicamentoByReceta(@Parameter(required = true, description = "id de la receta médica") @PathParam("receta") Long idReceta) throws CustomServerException {

		List<MedicamentoResponseDto> medicamentos = medicamentoService.getMedicamentosByReceta(idReceta);
		return Response.ok(medicamentos).build();

	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("ROL_ADMIN")
	@Operation(summary = "Añadir medicamentos", description = "Añade y persiste una lista de medicamentos")
	@APIResponse(responseCode = "201", description = "lista de medicamentos añadido y persistido")
	@APIResponse(responseCode = "500", description = "No se pudo añadir y persistir la lista de medicamentos por un error del servidor")
	public Response addMedicamento(@Parameter(required = true, description = "codigo de la receta médica") @QueryParam("codigoReceta") String codigoReceta,
			@Valid List<MedicamentoRequestDto> dtos) throws CustomServerException {

		List<MedicamentoResponseDto> response = this.medicamentoService.persistMedicamento(codigoReceta, dtos);
		return Response.status(Response.Status.CREATED).entity(response).build();

	}

	@PUT
	@Path("/{codigo}")
	@RolesAllowed({ "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Actualizar medicamento", description = "Actualiza un medicamento de una receta")
	@APIResponse(responseCode = "200", description = "medicamento actualizado")
	@APIResponse(responseCode = "500", description = "No se pudo actualizar el medicamento por un error del servidor")
	public Response updateMedicamento(
			@Parameter(required = true, description = "Código del medicamento") @PathParam("codigo") String codigoMedicamento,
			@Parameter(required = true, description = "id de la receta médica") @QueryParam("idReceta") Long idReceta, MedicamentoRequestDto dto) throws CustomServerException {

		MedicamentoResponseDto updatedMedicamento = medicamentoService.updateMedicamento(codigoMedicamento, idReceta,
				dto);
		return Response.ok(updatedMedicamento).build();

	}

	@DELETE
	@Path("/{codigo}")
	@RolesAllowed({ "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Eliminar medicamento", description = "Elimina un medicamento de una receta")
	@APIResponse(responseCode = "200", description = "medicamento eliminado")
	@APIResponse(responseCode = "500", description = "No se pudo eliminar el medicamento por un error del servidor")
	public Response deleteMedicamento(
			@Parameter(required = true, description = "Código del medicamento") @PathParam("codigo") String codigoMedicamento,
			@Parameter(required = true, description = "id de la receta médica") @QueryParam("idReceta") Long idReceta) throws CustomServerException {

		this.medicamentoService.deleteMedicamento(codigoMedicamento, idReceta);
		return Response.ok().build();

	}

}
