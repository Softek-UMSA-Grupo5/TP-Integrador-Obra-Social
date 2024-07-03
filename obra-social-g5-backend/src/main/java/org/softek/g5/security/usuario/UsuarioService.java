package org.softek.g5.security.usuario;

import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.security.PBKDF2Encoder;
import org.softek.g5.security.TokenUtils;
import org.softek.g5.security.usuario.dto.UsuarioLoginDto;
import org.softek.g5.security.usuario.dto.UsuarioRequestDto;
import org.softek.g5.security.usuario.dto.UsuarioResponseDto;
import org.softek.g5.validation.DataValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UsuarioService {

	@Inject
	UsuarioRepository usuarioRepository;

	@Inject
	PBKDF2Encoder passwordEncoder;

	@ConfigProperty(name = "com.lm0599.quarkusjwt.jwt.duration")
	public Long duration;
	@ConfigProperty(name = "mp.jwt.verify.issuer")
	public String issuer;

	@Transactional
	public UsuarioResponseDto login(UsuarioLoginDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);

			Optional<Usuario> optionalUsuario = usuarioRepository.findUser(dto.getUsername(),
					passwordEncoder.encode(dto.getPassword()));

			if (optionalUsuario.isEmpty())
				throw new EntityNotFoundException("Nombre de usuario o contraseña incorrecta");

			UsuarioResponseDto response = new UsuarioResponseDto();
			Usuario usuario = optionalUsuario.get();

			try {
				response.setId(usuario.getId());
				response.setUsername(usuario.getUsername());
				response.setRol(usuario.getRol());
				response.setToken(TokenUtils.generateToken(usuario.getUsername(), usuario.getRol(), duration, issuer));
			} catch (Exception e) {
				e.printStackTrace();
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al acceder un usuario");
		}

	}
	
	@Transactional
	public UsuarioResponseDto refreshToken(UsuarioResponseDto dto) throws CustomServerException {
		try {

			DataValidator.validateDtoFields(dto);

			Optional<Usuario> optionalUsuario = usuarioRepository.findByUsername(dto.getUsername());

			UsuarioResponseDto response = dto;

			try {
				response.setToken(TokenUtils.generateToken(dto.getUsername(), dto.getRol(), duration, issuer));
			} catch (Exception e) {
				e.printStackTrace();
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al acceder un usuario");
		}

	}

	@Transactional
	public void registrarUsuario(UsuarioRequestDto dto, UsuarioRolesEnum rol) throws CustomServerException {

		try {

			Optional<Usuario> optionalUsuario = usuarioRepository.findByUsername(dto.getUsername());

			if (optionalUsuario.isPresent()) {
				throw new EntityNotFoundException("Ya existe un usuario con este nombre");
			}

			DataValidator.validateDtoFields(dto);

			String passwordEncript = passwordEncoder.encode(dto.getPassword());
			Usuario usuario = new Usuario(null, dto.getUsername(), passwordEncript, dto.getEmail(), rol, false);
			System.out.println("Usuario a persistir: " + usuario);
			usuario.persist();

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al registrar un usuario");
		}

	}

	@Transactional
	public void eliminarUsuario(UsuarioRequestDto dto) throws CustomServerException {
		try {
			String passwordEncript = passwordEncoder.encode(dto.getPassword());
			int updatedRows = this.usuarioRepository.update(
					"estaEliminado = true WHERE username = ?1 and password = ?2", dto.getUsername(), passwordEncript);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Nombre de usuario o contraseña incorrecta");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un usuario");
		}
	}

	@Transactional
	public void restaurarUsuario(UsuarioRequestDto dto) throws CustomServerException {
		try {
			String passwordEncript = passwordEncoder.encode(dto.getPassword());
			int updatedRows = this.usuarioRepository.update(
					"estaEliminado = false WHERE username = ?1 and password = ?2", dto.getUsername(), passwordEncript);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Nombre de usuario o contraseña incorrecta");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al restaurar un usuario");
		}
	}

	@Transactional
	public Usuario getUsuarioByUsername(String username) {
		Optional<Usuario> optionalUsuario = usuarioRepository.findByUsername(username);
		return optionalUsuario.orElse(null);
	}

}
