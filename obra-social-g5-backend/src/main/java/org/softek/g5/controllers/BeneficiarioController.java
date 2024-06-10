package org.softek.g5.controllers;
import java.util.Collection;
import java.util.List;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
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
import lombok.AllArgsConstructor;

@Path("/beneficiarios")
@Blocking
@AllArgsConstructor
@Tag(name="BeneficiarioController", description="Endpoints del servicio Beneficiario")
public class BeneficiarioController {
	@Inject
	BeneficiarioService beneficiarioService;
	
	@GET
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Obtener todos los beneficiarios", description ="Se obtendrá una lista de todos los beneficiarios")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<BeneficiarioResponseDto> getAll() {
		return this.beneficiarioService.getBeneficiarios();
	}

	@POST
	@RolesAllowed({"USER", "ADMIN"})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear un beneficiario", description ="Se creará un beneficiario")
	@Transactional
	public Collection<BeneficiarioResponseDto> addBeneficiario(
			@Valid @QueryParam("dniSocio") int dniSocio,
			@Valid List<BeneficiarioRequestDto> dtos) {
		Collection<BeneficiarioResponseDto> response = this.beneficiarioService.persistBeneficiario(dniSocio, dtos);
		return response;
	}

	@PUT
	@RolesAllowed({"USER", "ADMIN"})
	@Operation(summary = "Actualizar un beneficiario", description ="Se actualizará un beneficiario")
	@Transactional
	@Path("/{dni}")
	public BeneficiarioResponseDto update(
			@Parameter(required = true, description = "Beneficiario DNI") @PathParam("dni") int dniBeneficiario,
			@Valid @QueryParam("idSocio") Long idSocio,
			BeneficiarioRequestDto dto) {
		return beneficiarioService.updateBeneficiario(dniBeneficiario, idSocio, dto);
	}

	@DELETE
	@RolesAllowed("ADMIN")
	@Operation(summary = "Eliminar un beneficiario", description ="Se eliminará un beneficiario")
	@Transactional
	@Path("/{id}")
	public void delete(@Parameter(required = true, description = "Beneficiario ID") @PathParam("id") Long idBeneficiario, @Valid @QueryParam("idSocio") Long idSocio) {
		this.beneficiarioService.deleteBeneficiario(idBeneficiario, idSocio);
	}
}
