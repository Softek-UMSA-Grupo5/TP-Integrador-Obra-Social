package org.softek.g5.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.consultorio.dto.ConsultorioCreateRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioUpdateRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.services.ConsultorioService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
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

@Path("/consultorios")
@Blocking
@ApplicationScoped
@AllArgsConstructor
@Tag(name = "ConsultorioController", description = "Endpoint para el servicio Consultorio")
public class ConsultorioController {

	private final ConsultorioService consultorioService;

	@GET
	@RolesAllowed({ "ROL_SOCIO", "ROL_RECEPCIONISTA" })
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener todos los consultorios", description = "Se obtendrá una lista de todos los consultorios disponibles")
	@APIResponse(responseCode = "200", description = "Lista de Consultorios")
	@APIResponse(responseCode = "404", description = "No hay consultorios registrados")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response getAllConsultorios() throws CustomServerException {

		List<ConsultorioResponseDto> consultorios = consultorioService.getAllConsultorios().stream()
				.map(ConsultorioFactory::toDto).collect(Collectors.toList());

		return Response.ok(consultorios).build();

	}

	@GET
	@RolesAllowed({ "ROL_RECEPCIONISTA" })
	@Path("/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener consultorio por código", description = "Se obtendrá un consultorio por su código")
	@APIResponse(responseCode = "200", description = "Consultorio por código")
	@APIResponse(responseCode = "404", description = "No se encuentra consultorio con ese código")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response getConsultorioByCodigo(@PathParam("codigo") String codigo) {
		ConsultorioResponseDto consultorio = ConsultorioFactory
				.toDto(consultorioService.getConsultorioByCodigo(codigo));
		return Response.ok(consultorio).build();
	}
	
	@GET
	@RolesAllowed({ "ROL_MEDICO", "ROL_RECEPCIONISTA" })
	@Path("/{medicoId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener consultorios por medico", description = "Se obtendrá los consultorios por su medico")
	@APIResponse(responseCode = "200", description = "Consultorio por medico")
	@APIResponse(responseCode = "404", description = "No se encuentra consultorio con ese medico")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response getConsultorioByMedico(@PathParam("medicoId") Long id) {
		List<ConsultorioResponseDto> consultorios = consultorioService.getConsultorioByMedico(id).stream()
				.map(ConsultorioFactory::toDto).collect(Collectors.toList());
		return Response.ok(consultorios).build();
	}

	@POST
	@RolesAllowed({ "ROL_RECEPCIONISTA" })
	@Transactional
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear consultorio", description = "Se creará un nuevo consultorio")
	@APIResponse(responseCode = "201", description = "Consultorio creado")
	@APIResponse(responseCode = "400", description = "La solicitud contiene datos inválidos")
	@APIResponse(responseCode = "409", description = "Los horarios no pueden superponerse")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response createConsultorio(@Valid ConsultorioCreateRequestDto dto) {

		ConsultorioResponseDto createdDto = ConsultorioFactory.toDto(consultorioService.createConsultorio(dto));
		return Response.status(Response.Status.CREATED).entity(createdDto).build();

	}

	@PUT
	@RolesAllowed({ "ROL_RECEPCIONISTA" })
	@Transactional
	@Operation(summary = "Actualizar consultorio", description = "Se actualizará un consultorio existente")
	@APIResponse(responseCode = "204", description = "Consultorio actualizado")
	@APIResponse(responseCode = "404", description = "Consultorio no encontrado")
	@APIResponse(responseCode = "409", description = "Los horarios no pueden superponerse")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response updateConsultorio(@Valid ConsultorioUpdateRequestDto dto) {
		consultorioService.updateConsultorio(dto);
		return Response.noContent().build();
	}

	@DELETE
	@RolesAllowed({ "ROL_RECEPCIONISTA" })
	@Path("/{id}")
	@Transactional
	@Operation(summary = "Eliminar consultorio", description = "Se marcará un consultorio como eliminado")
	@APIResponse(responseCode = "204", description = "Consultorio Eliminado")
	@APIResponse(responseCode = "404", description = "Consultorio no encontrado o ya esta eliminado")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response deleteConsultorio(@PathParam("id") Long id) {
		consultorioService.deleteConsultorio(id);
		return Response.noContent().build();
	}

	@PUT
	@RolesAllowed({ "ROL_RECEPCIONISTA" })
	@Path("/restore/{id}")
	@Transactional
	@Operation(summary = "Restaurar consultorio", description = "Se restaurará un consultorio eliminado")
	@APIResponse(responseCode = "204", description = "Consultorio restaurado")
	@APIResponse(responseCode = "404", description = "Consultorio no encontrado o no esta eliminado")
	@APIResponse(responseCode = "500", description = "Error interno del servidor")
	public Response restoreConsultorio(@PathParam("id") Long id) {
		consultorioService.restoreConsultorio(id);
		return Response.ok().build();
	}

}
