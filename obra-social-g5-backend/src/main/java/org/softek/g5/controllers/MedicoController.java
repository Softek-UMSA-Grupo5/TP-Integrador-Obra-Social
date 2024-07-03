package org.softek.g5.controllers;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.services.MedicoService;

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

@Path("/especialistas")
@Blocking
@AllArgsConstructor
@Tag(name="MedicoController", description="Endpoints del servicio Medico")
public class MedicoController {
	
	@Inject
	MedicoService medicoService;
	
	@Inject
	MedicoFactory medicoFactory;
	
	@GET
	@RolesAllowed({"ROL_SOCIO", "ROL_RECEPCIONISTA"})
	@Operation(summary = "Obtener todos los médicos especialistas", description ="Se obtendrá una lista de todos los médicos especialistas")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() throws CustomServerException{
		
		List<MedicoResponseDto> medicos = medicoService.getMedicosEspecialistas().stream().map(medicoFactory::createResponseFromEntity).collect(Collectors.toList());
		
		return Response.ok(medicos).build();
		
	}
	
	@GET
	@RolesAllowed({"ROL_MEDICO", "ROL_RECEPCIONISTA"})
	@Path("/{id}")
	@Operation(summary = "Obtener especialista por id", description ="Se obtendrá el especialista por id")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMedicoByid(@Parameter(required = true, description = "id del medicamento") @PathParam("id") Long id) throws CustomServerException{
		
		MedicoResponseDto medico = medicoFactory.createResponseFromEntity(medicoService.getMedicoById(id));
		
		return Response.ok(medico).build();
		
	}
	
	@POST
	@RolesAllowed({"ROL_RECEPCIONISTA"})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un médico especialista", description ="Se creará un médico especialista")
	@Transactional
	public Response addMedico(@Valid List<MedicoRequestDto> dtos) throws CustomServerException{
		
		List<MedicoResponseDto> medicos = medicoService.persistMedico(dtos).stream().map(medicoFactory::createResponseFromEntity).collect(Collectors.toList());
		
		return Response.ok(medicos).build();
		
	}
	
	@PUT
	@RolesAllowed("ROL_RECEPCIONISTA")
	@Path("/{id}")
	@Operation(summary = "Actualizar un médico especialista", description ="Se actualizará un médico especialista")
	@Transactional
	public Response update(@Parameter(required = true, description = "Medico ID") @PathParam("id") Long id, MedicoRequestDto dto) throws CustomServerException{
		
		MedicoResponseDto medico = medicoFactory.createResponseFromEntity(medicoService.updateMedico(id, dto));
		
		return Response.ok(medico).build();
		
	}
	
	@DELETE
	@RolesAllowed("ROL_RECEPCIONISTA")
	@Path("/{id}")
	@Operation(summary = "Eliminar un médico especialista", description ="Se eliminará un médico especialista")
	@Transactional
	public void delete(@Parameter(required = true, description = "Medico ID") @PathParam("id") Long id) throws CustomServerException{
		this.medicoService.deleteMedico(id);
	}
}
