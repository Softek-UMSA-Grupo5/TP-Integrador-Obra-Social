package org.softek.g5.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoCreateRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
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
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@Path("/turnoMedico")
@Blocking
@AllArgsConstructor
public class TurnoMedicoController {

	@Inject
	TurnoMedicoService turnoMedicoService;

	@Inject
	TurnoMedicoFactory turnoMedicoFactory;

	@GET
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los turnos médicos", description = "Devuelve una lista de todos los turnos médicos")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Lista de turnos médicos"),
			@APIResponse(responseCode = "500", description = "Error al obtener los turnos médicos") })
	public Response getAllTurnoMedico() throws CustomServerException {

		List<TurnoMedicoResponseDto> turnos = turnoMedicoService.getTurnoMedico().stream()
				.map(turnoMedicoFactory::createResponseFromEntity).collect(Collectors.toList());

		return Response.ok(turnos).build();

	}

	@GET
	@Path("/{codigo}")
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener el turno médico por código", description = "Devuelve el turno médico según el código proporcionado")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Turno médico encontrado"),
			@APIResponse(responseCode = "500", description = "Error al obtener el turno médico") })
	public Response getTurnoMedicoByCodigo(
			@Parameter(required = true, description = "codigo del turno médico") @PathParam("codigo") String codigoTurno)
			throws CustomServerException {

		TurnoMedicoResponseDto turnos = turnoMedicoFactory
				.createResponseFromEntity(turnoMedicoService.getTurnoMedicoByCodigo(codigoTurno));

		return Response.ok(turnos).build();

	}

	@GET
	@Path("/{idSocio}")
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener los turnos médicos de un socio", description = "Devuelve los turnos médicos de un soció según el id proporcionado")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Turnos médicos encontrados"),
			@APIResponse(responseCode = "500", description = "Error al obtener el turno médico") })
	public Response getTurnoMedicoBySocio(
			@Parameter(required = true, description = "id del socio") @PathParam("idSocio") Long idSocio)
			throws CustomServerException {

		List<TurnoMedicoResponseDto> turnos = turnoMedicoService.getTurnoMedicoBySocio(idSocio).stream()
				.map(turnoMedicoFactory::createResponseFromEntity).collect(Collectors.toList());;

		return Response.ok(turnos).build();

	}

	@GET
	@Path("/{idMedico}")
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener los turnos médicos realizados por un médico", description = "Devuelve los turnos médicos realizados por un médico según el id proporcionado")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Turnos médicos encontrados"),
			@APIResponse(responseCode = "500", description = "Error al obtener el turno médico") })
	public Response getTurnoMedicoByMedico(
			@Parameter(required = true, description = "id del médico") @PathParam("idMedico") Long idMedico)
			throws CustomServerException {
		
		List<TurnoMedicoResponseDto> turnos = turnoMedicoService.getTurnoMedicoByMedico(idMedico).stream()
				.map(turnoMedicoFactory::createResponseFromEntity).collect(Collectors.toList());;
		
		return Response.ok(turnos).build();
		
	}

	@GET
	@Path("fechas")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_MEDICO", "ROL_ADMIN" })
	@Operation(summary = "Obtener todas los turnos médicos entre dos fechas", description = "Devuelve una lista de todos los turnos médicos emitidos entre las dos fechas proporcionadas")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Lista de turnos médicos"),
			@APIResponse(responseCode = "500", description = "Error al obtener las recetas médicas") })
	public Response getRecetaMedicaBetweenDates(
			@Parameter(required = true, description = "fecha desde") @QueryParam("fechaDesde") String fechaDesde,
			@Parameter(required = true, description = "fecha hasta") @QueryParam("fechaHasta") String fechaHasta)
			throws CustomServerException {
		
		List<TurnoMedicoResponseDto> recetas = turnoMedicoService.getTurnoMedicoBetweenDates(fechaDesde, fechaHasta).stream()
				.map(turnoMedicoFactory::createResponseFromEntity).collect(Collectors.toList());;
		
		return Response.ok(recetas).build();
		
	}

	@POST
	@RolesAllowed({ "ROL_SOCIO", "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Añadir turnos médicos", description = "Añade y persiste una lista de turnos médicos")
	@APIResponses({ @APIResponse(responseCode = "201", description = "Turnos médicos añadidos y persistidos"),
			@APIResponse(responseCode = "500", description = "Error al añadir y persistir los turnos médicos") })
	@Transactional
	public Response addTurnoMedico(@Valid List<TurnoMedicoCreateRequestDto> dtos) throws CustomServerException {
		
		List<TurnoMedicoResponseDto> response = turnoMedicoService.persistTurnoMedico(dtos).stream()
				.map(turnoMedicoFactory::createResponseFromEntity).collect(Collectors.toList());;
		
		return Response.status(Response.Status.CREATED).entity(response).build();
		
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed({ "ROL_SOCIO", "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Operation(summary = "Actualizar turno médico", description = "Actualiza un turno médico existente")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Turno médico actualizado"),
			@APIResponse(responseCode = "500", description = "Error al actualizar el turno médico") })
	public Response update(
			@Valid TurnoMedicoUpdateRequestDto dto) throws CustomServerException {
		turnoMedicoService.updateTurnoMedico(dto);
		return Response.ok().build();
	}

	@DELETE
	@Path("/{codigo}")
	@RolesAllowed({ "ROL_SOCIO", "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Operation(summary = "Eliminar turno médico", description = "Elimina un turno médico existente")
	@APIResponses({ @APIResponse(responseCode = "200", description = "Turno médico eliminado"),
			@APIResponse(responseCode = "500", description = "Error al eliminar el turno médico") })
	public Response delete(
			@Parameter(required = true, description = "Código del turno médico") @PathParam("codigo") String codigo)
			throws CustomServerException {
		turnoMedicoService.deleteTurnoMedico(codigo);
		return Response.ok().build();
	}

}
