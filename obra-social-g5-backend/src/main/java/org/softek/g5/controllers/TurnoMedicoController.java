package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.exceptions.CustomHttpException;
import org.softek.g5.services.TurnoMedicoService;

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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@Path("/turnoMedico")
@Blocking
@AllArgsConstructor
public class TurnoMedicoController {

	@Inject
	TurnoMedicoService TurnoMedicoService;

	@GET
	@RolesAllowed("USER")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los turnos médicos", description = "Devuelve una lista de todos los turnos médicos")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Lista de turnos médicos"),
	    @APIResponse(responseCode = "500", description = "Error al obtener los turnos médicos")
	})
	public Response getAllTurnoMedico() {
	    try {
	        Collection<TurnoMedicoResponseDto> turnos = this.TurnoMedicoService.getTurnoMedico();
	        return Response.ok(turnos).build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al obtener los turnos médicos", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@POST
	@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Añadir turnos médicos", description = "Añade y persiste una lista de turnos médicos")
	@APIResponses({
	    @APIResponse(responseCode = "201", description = "Turnos médicos añadidos y persistidos"),
	    @APIResponse(responseCode = "500", description = "Error al añadir y persistir los turnos médicos")
	})
	@Transactional
	public Response addTurnoMedico(@Valid List<TurnoMedicoRequestDto> dtos) {
	    try {
	        Collection<TurnoMedicoResponseDto> response = this.TurnoMedicoService.persistTurnoMedico(dtos);
	        return Response.status(Response.Status.CREATED).entity(response).build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al añadir y persistir los turnos médicos", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@PUT
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("ADMIN")
	@Operation(summary = "Actualizar turno médico", description = "Actualiza un turno médico existente")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Turno médico actualizado"),
	    @APIResponse(responseCode = "500", description = "Error al actualizar el turno médico")
	})
	public Response update(@Parameter(required = true, description = "Código del turno médico") @PathParam("codigo") String codigo, @Valid TurnoMedicoRequestDto dto) {
	    try {
	        TurnoMedicoService.updateTurnoMedico(codigo, dto);
	        return Response.ok().build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al actualizar el turno médico", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}

	@DELETE
	@Path("/{codigo}")
	@RolesAllowed("ADMIN")
	@Operation(summary = "Eliminar turno médico", description = "Elimina un turno médico existente")
	@APIResponses({
	    @APIResponse(responseCode = "200", description = "Turno médico eliminado"),
	    @APIResponse(responseCode = "500", description = "Error al eliminar el turno médico")
	})
	public Response delete(@Parameter(required = true, description = "Código del turno médico") @PathParam("codigo") String codigo) {
	    try {
	        this.TurnoMedicoService.deleteTurnoMedico(codigo);
	        return Response.ok().build();
	    } catch (Exception e) {
	        throw new CustomHttpException("Error al eliminar el turno médico", Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
	    }
	}
	
}
