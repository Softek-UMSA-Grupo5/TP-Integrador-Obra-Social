package org.softek.g5.security.usuario.dto;

import org.softek.g5.security.usuario.UsuarioRolesEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioResponseDto {

	private UsuarioRolesEnum rol;
	private String username;
	private String token;
	
}
