package org.softek.g5.controllers;

import java.util.Collection;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.services.MedicamentoService;

import io.smallrye.common.annotation.Blocking;
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
import lombok.AllArgsConstructor;

@Path("/medicamentos")
@Blocking
@AllArgsConstructor
public class MedicamentoController {

	@Inject
	MedicamentoService medicamentoService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<MedicamentoResponseDto> getAll() {
		return this.medicamentoService.getMedicamentos();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional
	public Collection<MedicamentoResponseDto> addRecetaMedica(@Valid List<MedicamentoRequestDto> dtos) {
		Collection<MedicamentoResponseDto> response = this.medicamentoService.persistMedicamento(dtos);
		return response;
	}

	@PUT
	@Path("/{nombre}")
	public MedicamentoResponseDto update(@Parameter(required = true, description = "Medicamento name") @PathParam("nombre") String name, MedicamentoRequestDto dto) {
		return medicamentoService.updateMedicamento(name, dto);
	}

	@DELETE
	@Path("/{nombre}")
	public void delete(@Parameter(required = true, description = "Medicamento name") @PathParam("nombre") String name) {
		this.medicamentoService.deleteMedicamento(name);
	}

}
