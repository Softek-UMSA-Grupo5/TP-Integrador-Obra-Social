package org.softek.g5.services;

import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.softek.g5.entities.usuario.Usuario;
import org.softek.g5.entities.usuario.UsuarioRolesEnum;
import org.softek.g5.entities.usuario.dto.UsuarioRequestDto;
import org.softek.g5.entities.usuario.dto.UsuarioResponseDto;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.repositories.UsuarioRepository;
import org.softek.g5.security.PBKDF2Encoder;
import org.softek.g5.security.TokenUtils;
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
	public UsuarioResponseDto login(UsuarioRequestDto dto) {

		Optional<Usuario> optionalUsuario = usuarioRepository.findByUsername(dto.getUsername());
		UsuarioResponseDto response = new UsuarioResponseDto();
		try {
			if (optionalUsuario.isPresent()) {
				DataValidator.validateDtoFields(dto);
				Usuario usuario = optionalUsuario.get();
				if (usuario.getEstaEliminado()) {
					throw new Exception("Este usuario ya no se encuentra registrado");
				}
				if (usuario.getPassword().equals(passwordEncoder.encode(dto.getPassword()))) {
					response.setToken(
							TokenUtils.generateToken(usuario.getUsername(), usuario.getRoles(), duration, issuer));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Transactional
	public void registrarUsuario(UsuarioRequestDto dto) {

		Optional<Usuario> optionalUsuario = usuarioRepository.findByUsername(dto.getUsername());
		if (!optionalUsuario.isPresent()) {

			DataValidator.validateDtoFields(dto);

			String passwordEncript = passwordEncoder.encode(dto.getPassword());
			Usuario usuario = new Usuario(null, dto.getUsername(), passwordEncript, dto.getEmail(), UsuarioRolesEnum.USER, false);
			usuario.persist();
		}

	}

	@Transactional
	public void eliminarUsuario(UsuarioRequestDto dto) throws Exception {
		try {
			String passwordEncript = passwordEncoder.encode(dto.getPassword());
			int updatedRows = this.usuarioRepository.update(
					"estaEliminado = true WHERE username = ?1 and password = ?2", dto.getUsername(), passwordEncript);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Usuario no encontrado");
			}

		} catch (Exception e) {
			throw new Exception("Error al eliminar un usuario");
		}
	}

}
