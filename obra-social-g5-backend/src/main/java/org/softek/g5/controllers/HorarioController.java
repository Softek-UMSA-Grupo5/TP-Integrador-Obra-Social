package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.services.HorarioService;

import io.smallrye.common.annotation.Blocking;
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

@Path("/horarios")
@Blocking
@AllArgsConstructor
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name="HorarioController", description="Enpoints del servicio horarios")
public class HorarioController {

    private final HorarioService horarioService;

    @GET
    @Operation(summary = "Obtener horarios", description ="Se obtendrá una lista de horarios")
    public List<HorarioResponseDto> getAllHorarios() {
        return horarioService.getAllHorarios();
    }

    @GET
    @Path("/eliminados")
    @Operation(summary = "Obtener horarios eliminados", description = "Se obtendrá una Lista de horarios eliminados por soft delete")
    public List<HorarioResponseDto> getAllHorariosDeleted() {
        return horarioService.getAllHorariosDeleted();
    }

    @GET
    @Path("/{codigo}")
    @Operation(summary = "Obtener horario", description ="Se obtendrá un horario en particular")
    public Response getHorarioByCodigo(@PathParam("codigo") String codigo) {
        HorarioResponseDto dto = horarioService.getHorarioByCodigo(codigo);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    @Transactional
    @Operation(summary = "Crea horario", description ="Se creará un horario")
    public Response createHorario(@Valid HorarioRequestDto dto) {
        HorarioResponseDto createdDto = horarioService.createHorario(dto);
        return Response.status(Response.Status.CREATED).entity(createdDto).build();
    }

    @PUT
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Actualiza horario", description ="Se actualizará un horario en particular")
    public Response updateHorario(@PathParam("codigo") String codigo, @Valid HorarioRequestDto dto) {
        HorarioResponseDto updatedDto = horarioService.updateHorario(codigo, dto);
        if (updatedDto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updatedDto).build();
    }

    @PUT
    @Path("/restore/{codigo}")
    @Transactional
    @Operation(summary = "Restaurar horario", description ="Se restaurará un horario eliminado en particular")
    public Response restoreHorario(@PathParam("codigo") String codigo) {
        return horarioService.restoreHorario(codigo);
    }

    @DELETE
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Borrar horario", description ="Se borrará un horario por soft delete")
    public Response deleteHorario(@PathParam("codigo") String codigo) {
        if (horarioService.deleteHorario(codigo)) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}