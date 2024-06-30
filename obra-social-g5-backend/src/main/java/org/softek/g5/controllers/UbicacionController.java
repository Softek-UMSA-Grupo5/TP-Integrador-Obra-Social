package org.softek.g5.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
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
	@RolesAllowed({"ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener ubicaciones", description ="Se obtendrá una lista de ubicaciones")
    public Response getAllUbicaciones() {
        
    	List<UbicacionResponseDto> ubicaciones = ubicacionService.getAllUbicaciones().stream().map(UbicacionFactory::toDto)
				.collect(Collectors.toList());
		
		return Response.ok(ubicaciones).build();
    	
    }
    
    @GET
	@RolesAllowed({"ROL_RECEPCIONISTA"})
    @Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Obtener ubicación", description ="Se obtendrá una ubicación en particular")
    public Response getUbicacionByCodigo(@PathParam("codigo") String codigo) {
    	
        UbicacionResponseDto dto = UbicacionFactory.toDto(ubicacionService.getUbicacionByCodigo(codigo));
        
        return Response.ok(dto).build();
        
    }

    @POST
	@RolesAllowed({"ROL_RECEPCIONISTA"})
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Crear ubicación", description ="Se creará una ubicación en particular")
    public Response createUbicacion(@Valid UbicacionRequestDto dto) {
        UbicacionResponseDto createdDto = UbicacionFactory.toDto(ubicacionService.createUbicacion(dto));
        return Response.ok(createdDto).build();
    }

    @PUT
	@RolesAllowed({"ROL_RECEPCIONISTA"})
    @Path("/{codigo}")
    @Transactional
    @Operation(summary = "Actualizar ubicación", description ="Se actualizará una ubicación en particular")
    public Response updateUbicacion(@PathParam("codigo") String codigo, @Valid UbicacionRequestDto dto) {
             UbicacionResponseDto updatedDto = UbicacionFactory.toDto(ubicacionService.updateUbicacion(codigo, dto));
      
             return Response.ok(updatedDto).build();
    }

    @PUT
	@RolesAllowed({"ROL_RECEPCIONISTA"})
    @Path("/restore/{id}")
    @Transactional
    @Operation(summary = "Restaurar ubicación", description ="Se restaurará una ubicación en particular")
    public Response restoreUbicacion(@PathParam("id") Long id) {
       ubicacionService.restoreUbicacion(id);
        return Response.ok().build();
    }

    @DELETE
	@RolesAllowed({"ROL_RECEPCIONISTA"})
    @Path("/{id}")
    @Transactional
    @Operation(summary = "Eliminar ubicación", description ="Se eliminará una ubicación por soft delete")
    public Response deleteUbicacion(@PathParam("id") Long id) {
             ubicacionService.deleteUbicacion(id);
             return Response.ok().build();
    }
}
