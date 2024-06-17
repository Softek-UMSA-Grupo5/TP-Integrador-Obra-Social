package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
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
	@RolesAllowed({"ROL_SOCIO", "ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener horarios", description = "Se obtendrá una lista de horarios")
	@APIResponse(responseCode = "200", description = "Lista de horarios")
	public List<HorarioResponseDto> getAllHorarios() {
		return horarioService.getAllHorarios();
	}

	@GET
	@RolesAllowed({"ROL_ADMIN"})
	@Path("/eliminados")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener horarios eliminados", description = "Se obtendrá una Lista de horarios eliminados por soft delete")
	@APIResponse(responseCode = "200", description = "Lista de horarios eliminados")
	public List<HorarioResponseDto> getAllHorariosDeleted() {
		return horarioService.getAllHorariosDeleted();
	}

	@GET
	@RolesAllowed({"ROL_ADMIN","ROL_RECEPCIONISTA"})
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener horario", description = "Se obtendrá un horario en particular")
	@APIResponse(responseCode = "200", description = "Horario devuelto con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	public Response getHorarioByCodigo(@PathParam("codigo") String codigo) {
		HorarioResponseDto dto = horarioService.getHorarioByCodigo(codigo);
		if (dto == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		return Response.ok(dto).build();
	}

	@PUT
	@RolesAllowed({"ROL_ADMIN"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Actualiza horario", description ="Se actualizará un horario en particular")
	@APIResponse(responseCode = "200", description = "Horario actualizado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
    public Response updateHorario(@PathParam("codigo") String codigo, @Valid HorarioRequestDto dto) {
        HorarioResponseDto updatedDto = horarioService.updateHorario(codigo, dto);
        if (updatedDto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updatedDto).build();
    }
	
	@PUT
	@RolesAllowed({"ROL_ADMIN"})
	@Path("/restore/{codigo}")
	@Transactional
	@Operation(summary = "Restaurar horario", description = "Se restaurará un horario eliminado en particular")
	@APIResponse(responseCode = "200", description = "Horario restaurado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	@APIResponse(responseCode = "400", description = "El horario no está eliminado")
	public Response restoreHorario(@PathParam("codigo") String codigo) {
		return horarioService.restoreHorario(codigo);
	}

	@DELETE
	@RolesAllowed({"ROL_ADMIN"})
	@Path("/{codigo}")
	@Transactional
	@Operation(summary = "Borrar horario", description = "Se borrará un horario por soft delete")
	@APIResponse(responseCode = "204", description = "Horario eliminado con éxito")
	@APIResponse(responseCode = "404", description = "Horario no encontrado")
	public Response deleteHorario(@PathParam("codigo") String codigo) {
		return horarioService.deleteHorario(codigo);
	}
}