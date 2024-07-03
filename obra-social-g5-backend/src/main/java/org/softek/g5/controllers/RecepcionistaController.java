package org.softek.g5.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.recepcionista.RecepcionistaFactory;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaRequestDto;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaResponseDto;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.services.RecepcionistaService;

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

@Path("/recepcionistas")
@Blocking
@AllArgsConstructor
@Tag(name="RecepcionistaController", description="Endpoints del servicio Recepcionista")
public class RecepcionistaController {

	@Inject
	RecepcionistaService recepcionistaService;
	
	@Inject
	RecepcionistaFactory recepcionistaFactory;
	
	@GET
	@RolesAllowed({"ROL_RECEPCIONISTA", "ROL_ADMIN"})
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener recepcionista por id", description ="Se obtendrá una lista de todos los recepcionistas")
	public Response getAll() throws CustomServerException{
		
		List<RecepcionistaResponseDto> recepcionistas = recepcionistaService.getRecepcionistas().stream().map(recepcionistaFactory::createResponseFromEntity).collect(Collectors.toList());
		
		return Response.ok(recepcionistas).build();
		
	}
	
	@GET
	@Path("/{id}")
	@RolesAllowed({"ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los recepcionistas", description ="Se obtendrá una lista de todos los recepcionistas")
	public Response getRecepcionistaById( @Parameter(required = true, description = "id del recepcionista") @PathParam("id") Long id ) throws CustomServerException{
		
		RecepcionistaResponseDto recepcionista = recepcionistaFactory.createResponseFromEntity(recepcionistaService.getRecepcionistaById(id));
		
		return Response.ok(recepcionista).build();
		
	}
	
	@POST
	@RolesAllowed({"ROL_RECEPCIONISTA", "ROL_ADMIN"})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un recepcionista", description ="Se creará un recepcionista")
	@Transactional
	public Response addRecepcionista(@Valid RecepcionistaRequestDto dto) throws CustomServerException{
		
		RecepcionistaResponseDto recepcionista = recepcionistaFactory.createResponseFromEntity(recepcionistaService.persistRecepcionista(dto));
		return Response.ok(recepcionista).build();
		
	}
	
	@PUT
	@RolesAllowed({"ROL_RECEPCIONISTA", "ROL_ADMIN"})
	@Operation(summary = "Actualizar un recepcionista", description ="Se actualizará un recepcionista")
	@Transactional
	public Response update(RecepcionistaUpdateRequestDto dto) throws CustomServerException{
		
		recepcionistaService.updateRecepcionista(dto);
		return Response.ok().build();
		
	}
	
	@DELETE
	@RolesAllowed({"ROL_RECEPCIONISTA", "ROL_ADMIN"})
	@Path("/{id}")
	@Operation(summary = "Eliminar un recepcionista", description ="Se eliminará un recepcionista")
	@Transactional
	public Response delete(@Parameter(required = true, description = "Recepcionista ID") @PathParam("id") Long id) throws CustomServerException{
		this.recepcionistaService.deleteRecepcionista(id);
		return Response.ok().build();
	}
	
}
