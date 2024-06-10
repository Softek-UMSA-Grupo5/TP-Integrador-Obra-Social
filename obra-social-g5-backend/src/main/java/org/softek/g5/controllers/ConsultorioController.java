package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.services.ConsultorioService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
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

@Path("/consultorios")
@Blocking
@ApplicationScoped
@AllArgsConstructor
@Tag(name = "ConsultorioController", description = "Endpoint para el servicio Consultorio")
public class ConsultorioController {
	
	private final ConsultorioService consultorioService;
	
	@GET
	@RolesAllowed({"USER", "ADMIN"})
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener todos los consultorios", description = "Se obtendrá una lista de todos los consultorios disponibles")
	public List<ConsultorioResponseDto>hetAllConsultorios() {
		return consultorioService.getAllConsultorios();
	}
	
	@GET
	@RolesAllowed({"ADMIN"})
    @Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener consultorio por código", description = "Se obtendrá un consultorio por su código")
    public ConsultorioResponseDto getConsultorioByCodigo(@PathParam("codigo") String codigo) {
        return consultorioService.getConsultorioByCodigo(codigo);
    }
	
	@GET
	@RolesAllowed({"ADMIN"})
    @Path("/eliminados")
    @Operation(summary = "Obtener todos los consultorios eliminados", description = "Se obtendrá una lista de todos los consultorios eliminados")
    public List<ConsultorioResponseDto> getAllConsultoriosDeleted() {
        return consultorioService.getAllConsultoriosDeleted();
    }
	
    @POST
    @RolesAllowed({"ADMIN"})
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Crear consultorio", description = "Se creará un nuevo consultorio")
    public Response createConsultorio(@Valid ConsultorioRequestDto dto) {
        ConsultorioResponseDto createdDto = consultorioService.createConsultorio(dto);
        return Response.status(Response.Status.CREATED).entity(createdDto).build();
    }
	
    @PUT
    @RolesAllowed({"ADMIN"})
    @Path("/{dniMedico}")
    @Transactional
    @Operation(summary = "Actualizar consultorio", description = "Se actualizará un consultorio existente")
    public Response updateConsultorio(@PathParam("dniMedico") int dniMedico, @Valid ConsultorioRequestDto dto) {
        consultorioService.updateConsultorio(dniMedico, dto);
        return Response.noContent().build();
    }
    //
    
    @DELETE
    @RolesAllowed({"ADMIN"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Eliminar consultorio", description = "Se marcará un consultorio como eliminado")
    public Response deleteConsultorio(@PathParam("codigo") String codigo) {
        boolean deleted = consultorioService.deleteConsultorio(codigo);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @RolesAllowed({"ADMIN"})
    @Path("/restore/{codigo}")
    @Transactional
    @Operation(summary = "Restaurar consultorio", description = "Se restaurará un consultorio eliminado")
    public Response restoreConsultorio(@PathParam("codigo") String codigo) {
        return consultorioService.restoreConsultorio(codigo);
    }
	
}
