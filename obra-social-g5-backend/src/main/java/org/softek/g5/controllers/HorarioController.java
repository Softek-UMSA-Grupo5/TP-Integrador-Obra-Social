package org.softek.g5.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.horario.dto.HorarioUpdateRequestDto;
import org.softek.g5.services.HorarioService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/horarios")
@Blocking
@Tag(name = "HorarioController", description = "Enpoints del servicio horarios")
public class HorarioController {
	@Inject
	HorarioService horarioService;

	@GET
	@RolesAllowed({ "ROL_SOCIO", "ROL_ADMIN", "ROL_RECEPCIONISTA" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener horarios", description = "Se obtendrá una lista de horarios")
	@APIResponse(responseCode = "200", description = "Lista de horarios")
	public Response getAllHorarios() {

		List<HorarioResponseDto> horarios = horarioService.getAllHorarios().stream().map(HorarioFactory::toDto)
				.collect(Collectors.toList());

		return Response.ok(horarios).build();
	}

	@GET
	@RolesAllowed({ "ROL_ADMIN", "ROL_RECEPCIONISTA" })
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener horario", description = "Se obtendrá un horario en particular")
	@APIResponse(responseCode = "200", description = "Horario devuelto con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	public Response getHorarioByCodigo(@PathParam("codigo") String codigo) {

		HorarioResponseDto dto = HorarioFactory.toDto(horarioService.getHorarioByCodigo(codigo));

		return Response.ok(dto).build();
	}

	@PUT
	@RolesAllowed({ "ROL_ADMIN" })
	@Transactional
	@Operation(summary = "Actualiza horario", description = "Se actualizará un horario en particular")
	@APIResponse(responseCode = "200", description = "Horario actualizado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	public Response updateHorario(@Valid HorarioUpdateRequestDto dto) {

		HorarioResponseDto updatedDto = HorarioFactory.toDto(horarioService.updateHorario(dto));

		return Response.ok(updatedDto).build();
	}

	@PUT
	@RolesAllowed({ "ROL_ADMIN" })
	@Path("/restore/{id}")
	@Transactional
	@Operation(summary = "Restaurar horario", description = "Se restaurará un horario eliminado en particular")
	@APIResponse(responseCode = "200", description = "Horario restaurado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	@APIResponse(responseCode = "400", description = "El horario no está eliminado")
	public Response restoreHorario(@PathParam("id") Long idHorario) {

		horarioService.restoreHorario(idHorario);

		return Response.ok().build();

	}

	@DELETE
	@RolesAllowed({ "ROL_ADMIN" })
	@Path("/{id}")
	@Transactional
	@Operation(summary = "Borrar horario", description = "Se borrará un horario por soft delete")
	@APIResponse(responseCode = "204", description = "Horario eliminado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	public Response deleteHorario(@PathParam("id") Long idHorario) {

		horarioService.deleteHorario(idHorario);

		return Response.ok().build();

	}
}