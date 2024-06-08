package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
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
import jakarta.ws.rs.core.Response.ResponseBuilder;
import lombok.AllArgsConstructor;

@Path("/turnoMedico")
@Blocking
@AllArgsConstructor
public class TurnoMedicoController {

	@Inject
	TurnoMedicoService TurnoMedicoService;

	@GET
	//@RolesAllowed("USER")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TurnoMedicoResponseDto> getAll() {
		return this.TurnoMedicoService.getTurnoMedico();
	}

	@POST
	//@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional
	public Collection<TurnoMedicoResponseDto> addTurnoMedico(@Valid List<TurnoMedicoRequestDto> dtos) {
		Collection<TurnoMedicoResponseDto> response = this.TurnoMedicoService.persistTurnoMedico(dtos);
		return response;
	}

	@PUT
	@Path("/{codigo}")
	public ResponseBuilder update(@Parameter(required = true, description = "TurnoMedico name") @PathParam("codigo") String codigo, TurnoMedicoRequestDto dto) {
		TurnoMedicoService.updateTurnoMedico(codigo, dto);
		return Response.ok();
	}

	@DELETE
	@Path("/{codigo}")
	public void delete(@Parameter(required = true, description = "TurnoMedico name") @PathParam("codigo") String codigo) {
		this.TurnoMedicoService.deleteTurnoMedico(codigo);
	}
	
}
