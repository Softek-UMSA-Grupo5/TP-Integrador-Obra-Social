package org.softek.g5.controllers;

import org.softek.g5.entities.usuario.dto.UsuarioRequestDto;
import org.softek.g5.entities.usuario.dto.UsuarioResponseDto;
import org.softek.g5.services.UsuarioService;

import io.smallrye.common.annotation.Blocking;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/usuarios")
@Blocking
public class UsuarioController {

	@Inject
	UsuarioService usuarioService;
	
	@PermitAll
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public UsuarioResponseDto login(@Valid UsuarioRequestDto dto) {
		return usuarioService.login(dto);
	}
	
}
