package org.softek.g5.services;

import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.softek.g5.entities.usuario.Usuario;
import org.softek.g5.entities.usuario.dto.UsuarioRequestDto;
import org.softek.g5.entities.usuario.dto.UsuarioResponseDto;
import org.softek.g5.repositories.UsuarioRepository;
import org.softek.g5.security.PBKDF2Encoder;
import org.softek.g5.security.TokenUtils;

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
				Usuario usuario = optionalUsuario.get();
				if (usuario.getPassword().equals(passwordEncoder.encode(dto.getPassword()))) {
					response.setToken(TokenUtils.generateToken(usuario.getUsername(), usuario.getRoles(), duration, issuer));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

}
