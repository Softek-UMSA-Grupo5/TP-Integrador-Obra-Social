package org.softek.g5.controllers;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.entitiesCustomException.ubicacion.UbicacionNotFoundException;
import org.softek.g5.services.UbicacionService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
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

@Path("/ubicaciones")
@Blocking
@AllArgsConstructor
@Tag(name="UbicacionController", description="Enpoints del servicio ubicaciones")
public class UbicacionController {

    private final UbicacionService ubicacionService;

    @GET
	@RolesAllowed({"USER", "ADMIN"})
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener ubicaciones", description ="Se obtendrá una lista de ubicaciones")
    public List<UbicacionResponseDto> getAllUbicaciones() {
        return ubicacionService.getAllUbicaciones();
    }
    
    @GET
	@RolesAllowed({"ADMIN"})
    @Path("/eliminados")
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener ucicacion eliminadas", description = "Se obtendrá una lista con las ubicaciones eliminadas")
    public List<UbicacionResponseDto> getAllUbicacionDeleted(){
    	return ubicacionService.getAllUbicacionesDeleted();
    }
    
    
    @GET
	@RolesAllowed({"ADMIN"})
    @Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener ubicación", description ="Se obtendrá una ubicación en particular")
    public Response getUbicacionByCodigo(@PathParam("codigo") String codigo) {
        UbicacionResponseDto dto = ubicacionService.getUbicacionByCodigo(codigo);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
	@RolesAllowed({"ADMIN"})
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Crear ubicación", description ="Se creará una ubicación en particular")
    public Response createUbicacion(@Valid UbicacionRequestDto dto) {
        UbicacionResponseDto createdDto = ubicacionService.createUbicacion(dto);
        return Response.status(Response.Status.CREATED).entity(createdDto).build();
    }

    @PUT
	@RolesAllowed({"ADMIN"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Actualizar ubicación", description ="Se actualizará una ubicación en particular")
    public Response updateUbicacion(@PathParam("codigo") String codigo, @Valid UbicacionRequestDto dto) {
    	 try {
             UbicacionResponseDto updatedDto = ubicacionService.updateUbicacion(codigo, dto);
             return Response.ok(updatedDto).build();
         } catch (UbicacionNotFoundException e) {
             return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
         }
    }

    @PUT
	@RolesAllowed({"ADMIN"})
    @Path("/restore/{codigo}")
    @Transactional
    @Operation(summary = "Restaurar ubicación", description ="Se restaurará una ubicación en particular")
    public Response restoreUbicacion(@PathParam("codigo") String codigo) {
        return ubicacionService.restoreUbicacion(codigo);
    }

    @DELETE
	@RolesAllowed({"ADMIN"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Eliminar ubicación", description ="Se eliminará una ubicación por soft delete")
    public Response deleteUbicacion(@PathParam("codigo") String codigo) {
    	 try {
             return ubicacionService.deleteUbicacion(codigo);
         } catch (UbicacionNotFoundException e) {
             return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
         }
    }
}
