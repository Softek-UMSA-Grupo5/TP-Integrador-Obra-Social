package org.softek.g5.entities.recepcionista;

import org.softek.g5.entities.recepcionista.dto.RecepcionistaRequestDto;
import org.softek.g5.entities.recepcionista.dto.RecepcionistaResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecepcionistaFactory {
	public Recepcionista createEntityFromDto(RecepcionistaRequestDto dto) {
		return Recepcionista.builder().nombre(dto.getNombre()).apellido(dto.getApellido()).telefono(dto.getTelefono())
				.email(dto.getEmail()).dni(dto.getDni()).cuil(dto.getCuil()).fechaNacimiento(dto.getFechaNacimiento())
				.estaEliminado(false).usuario(null).build();
	}

	public RecepcionistaResponseDto createResponseFromEntity(Recepcionista recepcionista) {
		return RecepcionistaResponseDto.builder().id(recepcionista.getId()).nombre(recepcionista.getNombre())
				.apellido(recepcionista.getApellido()).telefono(recepcionista.getTelefono())
				.email(recepcionista.getEmail()).dni(recepcionista.getDni()).cuil(recepcionista.getCuil())
				.fechaNacimiento(recepcionista.getFechaNacimiento()).estaEliminado(recepcionista.getEstaEliminado())
				.usuarioId(recepcionista.getUsuario().getId())
				.build();
	}
}
