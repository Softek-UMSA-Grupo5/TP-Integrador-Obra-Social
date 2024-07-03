package org.softek.g5.controllers;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.services.BeneficiarioService;

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
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@Path("/beneficiarios")
@Blocking
@AllArgsConstructor
@Tag(name="BeneficiarioController", description="Endpoints del servicio Beneficiario")
public class BeneficiarioController {
	
	@Inject
	BeneficiarioService beneficiarioService;
	
	@Inject
	BeneficiarioFactory beneficiarioFactory;
	
	@GET
	@RolesAllowed({"ROL_SOCIO", "ROL_RECEPCIONISTA"})
	@Operation(summary = "Obtener todos los beneficiarios", description ="Se obtendrá una lista de todos los beneficiarios")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() throws CustomServerException{
		
		List<BeneficiarioResponseDto> response =  beneficiarioService.getBeneficiarios().stream().map(beneficiarioFactory::createResponseFromEntity)
				.collect(Collectors.toList());
		
		return Response.ok(response).build();
		
	}

	@POST
	@RolesAllowed({"ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un beneficiario", description ="Se creará un beneficiario")
	@Transactional
	public Response addBeneficiario(
			@Valid @QueryParam("dniSocio") int dniSocio,
			@Valid List<BeneficiarioRequestDto> dtos) throws CustomServerException{
		
		List<BeneficiarioResponseDto> response = beneficiarioService.persistBeneficiario(dniSocio, dtos).stream().map(beneficiarioFactory::createResponseFromEntity)
				.collect(Collectors.toList());
		
		return Response.ok(response).build();
		
	}

	@PUT
	@RolesAllowed({"ROL_RECEPCIONISTA"})
	@Operation(summary = "Actualizar un beneficiario", description ="Se actualizará un beneficiario")
	@Transactional
	@Path("/{dni}")
	public Response update(
			@Parameter(required = true, description = "Beneficiario DNI") @PathParam("dni") Long idBeneficiario,
			@Valid @QueryParam("idSocio") Long idSocio,
			BeneficiarioUpdateRequestDto dto) throws CustomServerException{
		
		BeneficiarioResponseDto response = beneficiarioFactory.createResponseFromEntity(beneficiarioService.updateBeneficiario(idSocio, dto));
		
		return Response.ok(response).build();
		
	}

	@DELETE
	@RolesAllowed({"ROL_RECEPCIONISTA"})
	@Operation(summary = "Eliminar un beneficiario", description ="Se eliminará un beneficiario")
	@Transactional
	@Path("/{id}")
	public Response delete(@Parameter(required = true, description = "Beneficiario ID") @PathParam("id") Long idBeneficiario, @Valid @QueryParam("idSocio") Long idSocio) throws CustomServerException{
		
		this.beneficiarioService.deleteBeneficiario(idBeneficiario, idSocio);
		
		return Response.ok().build();
	}
}
