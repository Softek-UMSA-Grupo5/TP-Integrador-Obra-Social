package org.softek.g5.controllers;
import java.util.Collection;
import java.util.List;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.services.MedicoService;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;
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
import lombok.AllArgsConstructor;

@Path("/especialistas")
@Blocking
@AllArgsConstructor
@Tag(name="MedicoController", description="Endpoints del servicio Medico")
public class MedicoController {
	@Inject
	MedicoService medicoService;
	
	@GET
	//@RolesAllowed("USER")
	@Operation(summary = "Obtener todos los médicos especialistas", description ="Se obtendrá una lista de todos los médicos especialistas")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<MedicoResponseDto> getAll(){
		return this.medicoService.getMedicosEspecialistas();
	}
	
	@POST
	//@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un médico especialista", description ="Se creará un médico especialista")
	@Transactional
	public Collection<MedicoResponseDto> addMedico(@Valid List<MedicoRequestDto> dtos) {
		Collection<MedicoResponseDto> response = this.medicoService.persistMedico(dtos);
		return response;
	}
	
	@PUT
	//@RolesAllowed("ADMIN")
	@Path("/{id}")
	@Operation(summary = "Actualizar un médico especialista", description ="Se actualizará un médico especialista")
	@Transactional
	public ResponseBuilder update(@Parameter(required = true, description = "Medico ID") @PathParam("id") Long id, MedicoRequestDto dto) {
		medicoService.updateMedico(id, dto);
		return Response.ok();
	}
	
	@DELETE
	//@RolesAllowed("ADMIN")
	@Path("/{id}")
	@Operation(summary = "Eliminar un médico especialista", description ="Se eliminará un médico especialista")
	@Transactional
	public void delete(@Parameter(required = true, description = "Medico ID") @PathParam("id") Long id) {
		this.medicoService.deleteMedico(id);
	}
}
