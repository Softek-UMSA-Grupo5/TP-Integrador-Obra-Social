package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
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
	@RolesAllowed({"ROL_SOCIO", "ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener todos los consultorios", description = "Se obtendrá una lista de todos los consultorios disponibles")
    @APIResponse(responseCode = "200", description = "Lista de Consultorios")
    @APIResponse(responseCode = "404", description = "No hay consultorios registrados")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
	public List<ConsultorioResponseDto>hetAllConsultorios() throws CustomServerException {
		return consultorioService.getAllConsultorios();
	}
	
	@GET
	@RolesAllowed({"ROL_ADMIN", "ROL_RECEPCIONISTA"})
    @Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener consultorio por código", description = "Se obtendrá un consultorio por su código")
    @APIResponse(responseCode = "200", description = "Consultorio por código")
    @APIResponse(responseCode = "404", description = "No se encuentra consultorio con ese código")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public ConsultorioResponseDto getConsultorioByCodigo(@PathParam("codigo") String codigo){
        return consultorioService.getConsultorioByCodigo(codigo);
    }
	
	@GET
	@RolesAllowed({"ROL_ADMIN"})
    @Path("/eliminados")
    @Operation(summary = "Obtener todos los consultorios eliminados", description = "Se obtendrá una lista de todos los consultorios eliminados")
    @APIResponse(responseCode = "200", description = "Lista de consultorios eliminados")
    @APIResponse(responseCode = "404", description = "No hay consultorios eliminados")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public List<ConsultorioResponseDto> getAllConsultoriosDeleted() {
        return consultorioService.getAllConsultoriosDeleted();
    }
	
    @POST
    @RolesAllowed({"ROL_ADMIN"})
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Crear consultorio", description = "Se creará un nuevo consultorio")
    @APIResponse(responseCode = "201", description = "Consultorio creado")
    @APIResponse(responseCode = "400", description = "La solicitud contiene datos inválidos")
    @APIResponse(responseCode = "409", description = "Los horarios no pueden superponerse")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public Response createConsultorio(@Valid ConsultorioRequestDto dto) {
        ConsultorioResponseDto createdDto = consultorioService.createConsultorio(dto);
        return Response.status(Response.Status.CREATED).entity(createdDto).build();
    }
	
    @PUT
    @RolesAllowed({"ROL_ADMIN"})
    @Path("/{dniMedico}")
    @Transactional
    @Operation(summary = "Actualizar consultorio", description = "Se actualizará un consultorio existente")
    @APIResponse(responseCode = "204", description = "Consultorio actualizado")
    @APIResponse(responseCode = "404", description = "Consultorio no encontrado")
    @APIResponse(responseCode = "409", description = "Los horarios no pueden superponerse")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public Response updateConsultorio(@PathParam("dniMedico") int dniMedico, @Valid ConsultorioRequestDto dto) {
        consultorioService.updateConsultorio(dniMedico, dto);
        return Response.noContent().build();
    }
    
    @DELETE
    @RolesAllowed({"ROL_ADMIN"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Eliminar consultorio", description = "Se marcará un consultorio como eliminado")
    @APIResponse(responseCode = "204", description = "Consultorio Eliminado")
    @APIResponse(responseCode = "404", description = "Consultorio no encontrado o ya esta eliminado")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public Response deleteConsultorio(@PathParam("codigo") String codigo) {
        boolean deleted = consultorioService.deleteConsultorio(codigo);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @RolesAllowed({"ROL_ADMIN"})
    @Path("/restore/{codigo}")
    @Transactional
    @Operation(summary = "Restaurar consultorio", description = "Se restaurará un consultorio eliminado")
    @APIResponse(responseCode = "204", description = "Consultorio restaurado")
    @APIResponse(responseCode = "404", description = "Consultorio no encontrado o no esta eliminado")
    @APIResponse(responseCode = "500", description = "Error interno del servidor")
    public Response restoreConsultorio(@PathParam("codigo") String codigo) {
        return consultorioService.restoreConsultorio(codigo);
    }
	
}
