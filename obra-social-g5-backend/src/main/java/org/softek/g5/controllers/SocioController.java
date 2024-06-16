package org.softek.g5.controllers;
import java.util.Collection;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.socio.dto.SocioResponseDto;
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
import jakarta.ws.rs.core.Response.ResponseBuilder;
import lombok.AllArgsConstructor;

@Path("/socios")
@Blocking
@AllArgsConstructor
@Tag(name="SocioController", description="Endpoints del servicio Socio")
public class SocioController {
	@Inject
	SocioService socioService;
	
	@GET
	@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los socios", description ="Se obtendrá una lista de todos los socios")
	public Collection<SocioResponseDto> getAll() throws CustomServerException{
		return this.socioService.getSocios();
	}
	
	@POST
	@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un socio", description ="Se creará un socio")
	@Transactional
	public SocioResponseDto addSocio(@Valid SocioRequestDto dto) throws CustomServerException{
		SocioResponseDto response = this.socioService.persistSocio(dto);
		return response;
	}
	
	@PUT
	@RolesAllowed({"USER", "ADMIN"})
	@Path("/{id}")
	@Operation(summary = "Actualizar un socio", description ="Se actualizará un socio")
	@Transactional
	public ResponseBuilder update(@Parameter(required = true, description = "Socio ID") @PathParam("id") Long id, SocioRequestDto dto) throws CustomServerException{
		socioService.updateSocio(id, dto);
		return Response.ok();
	}
	
	@DELETE
	@RolesAllowed("ADMIN")
	@Path("/{id}")
	@Operation(summary = "Eliminar un socio", description ="Se eliminará un socio")
	@Transactional
	public void delete(@Parameter(required = true, description = "Socio ID") @PathParam("id") Long id) throws CustomServerException{
		this.socioService.deleteSocio(id);
	}
}
