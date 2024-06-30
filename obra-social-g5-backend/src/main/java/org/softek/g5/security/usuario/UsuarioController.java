package org.softek.g5.security.usuario;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.recepcionista.RecepcionistaFactory;
import org.softek.g5.entities.socio.SocioFactory;
import org.softek.g5.security.usuario.dto.UsuarioLoginDto;
import org.softek.g5.security.usuario.dto.UsuarioRequestDto;
import org.softek.g5.security.usuario.dto.UsuarioResponseDto;
import org.softek.g5.services.MedicoService;
import org.softek.g5.services.RecepcionistaService;
import org.softek.g5.services.SocioService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/usuarios")
@Blocking
public class UsuarioController {

	@Inject
	UsuarioService usuarioService;
	
	@Inject
	MedicoService medicoService;
	
	@Inject
	MedicoFactory medicoFactory;
	
	@Inject
	SocioService socioService;
	
	@Inject
	SocioFactory socioFactory;
	
	@Inject
	RecepcionistaService recepcionistaService;
	
	@Inject
	RecepcionistaFactory recepcionistaFactory;

	@PermitAll
	@POST
	@Path("/login")
	@Operation(summary = "Iniciar sesión", description = "Permite el un usuario inicie sesión")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(@Valid UsuarioLoginDto dto) {
		return Response.ok(usuarioService.login(dto)).build();
	}

	@POST
	@Path("/refresh")
	@RolesAllowed({ "ROL_RECEPCIONISTA", "ROL_ADMIN", "ROL_SOCIO", "ROL_MEDICO" })
	@Operation(summary = "refresca el token", description = "Devuelve un token nuevo")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response refreshToken(@Valid UsuarioResponseDto dto) {
		return Response.ok(usuarioService.refreshToken(dto)).build();
	}

	@POST
	@RolesAllowed({ "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Operation(summary = "Registrar usuario", description = "Permite registrar un usuario")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registrarSocio(@Valid UsuarioRequestDto dto,
			@Parameter(required = true, description = "Rol de usuario") @QueryParam("Rol Usuario") UsuarioRolesEnum rol) {
		usuarioService.registrarUsuario(dto, rol);
		return Response.ok().build();
	}

	@DELETE
	@RolesAllowed({ "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Operation(summary = "Eliminar usuario", description = "Permite eliminar un usuario")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response eliminarUsuario(@Valid UsuarioRequestDto dto) throws Exception {
		usuarioService.eliminarUsuario(dto);
		return Response.ok().build();
	}

	@PUT
	@RolesAllowed({ "ROL_RECEPCIONISTA", "ROL_ADMIN" })
	@Operation(summary = "Restaurar usuario", description = "Permite restaurar un usuario eliminado")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response restaurarUsuario(@Valid UsuarioRequestDto dto) throws Exception {
		usuarioService.restaurarUsuario(dto);
		return Response.ok().build();
	}
	
	@POST
	@Path("/info")
	@RolesAllowed({ "ROL_RECEPCIONISTA", "ROL_SOCIO", "ROL_MEDICO" })
	@Operation(summary = "Devuelve información del usuario", description = "Devuelve información del usuario")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getUserInfo(@Valid UsuarioResponseDto dto) {
		switch(dto.getRol()) {
		case ROL_SOCIO:
			return Response.ok(socioFactory.createResponseFromEntity(socioService.getSocioByUser(dto.getId()))).build();
		case ROL_MEDICO:
			return Response.ok(medicoFactory.createResponseFromEntity(medicoService.getMedicoByUser(dto.getId()))).build();
		case ROL_RECEPCIONISTA:
			return Response.ok(recepcionistaFactory.createResponseFromEntity(recepcionistaService.getRecepcionistaByUser(dto.getId()))).build();
		default:
			break;
		}
		return Response.noContent().build();
	}

}
