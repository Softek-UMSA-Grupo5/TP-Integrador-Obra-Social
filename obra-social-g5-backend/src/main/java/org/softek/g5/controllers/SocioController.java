package org.softek.g5.controllers;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.socio.SocioFactory;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.socio.dto.SocioResponseDto;
import org.softek.g5.entities.socio.dto.SocioUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.services.SocioService;

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

@Path("/socios")
@Blocking
@AllArgsConstructor
@Tag(name="SocioController", description="Endpoints del servicio Socio")
public class SocioController {
	
	@Inject
	SocioService socioService;
	
	@Inject
	SocioFactory socioFactory;
	
	@GET
	@RolesAllowed({"ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los socios", description ="Se obtendrá una lista de todos los socios")
	public Response getAll() throws CustomServerException{
		
		List<SocioResponseDto> socios = socioService.getSocios().stream().map(socioFactory::createResponseFromEntity).collect(Collectors.toList());
		
		return Response.ok(socios).build();
		
	}
	
	@POST
	@RolesAllowed({"ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un socio", description ="Se creará un socio")
	@Transactional
	public Response addSocio(@Valid SocioRequestDto dto) throws CustomServerException{
		
		SocioResponseDto socio = socioFactory.createResponseFromEntity(socioService.persistSocio(dto));
		return Response.ok(socio).build();
		
	}
	
	@PUT
	@RolesAllowed({"ROL_ADMIN", "ROL_RECEPCIONISTA"})
	@Operation(summary = "Actualizar un socio", description ="Se actualizará un socio")
	@Transactional
	public Response update(SocioUpdateRequestDto dto) throws CustomServerException{
		
		socioService.updateSocio(dto);
		return Response.ok().build();
		
	}
	
	@DELETE
	@RolesAllowed({"ROL_ADMIN"})
	@Path("/{id}")
	@Operation(summary = "Eliminar un socio", description ="Se eliminará un socio")
	@Transactional
	public Response delete(@Parameter(required = true, description = "Socio ID") @PathParam("id") Long id) throws CustomServerException{
		this.socioService.deleteSocio(id);
		return Response.ok().build();
	}
}
