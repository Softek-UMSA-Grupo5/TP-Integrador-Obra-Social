package org.softek.g5.entities.beneficiario;

import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BeneficiarioFactory {
	public Beneficiario createEntityFromDto(BeneficiarioRequestDto dto) {
		return Beneficiario.builder()
				.nombre(dto.getNombre())
				.apellido(dto.getApellido())
				.telefono(dto.getTelefono())
				.email(dto.getEmail())
				.dni(dto.getDni())
				.cuil(dto.getCuil())
				.fechaNacimiento(dto.getFechaNacimiento())
				.estaEliminado(false)
				.build();
	}
	
	public BeneficiarioResponseDto createResponseFromEntity(Beneficiario beneficiario) {
		return BeneficiarioResponseDto.builder()
				.id(beneficiario.getId())
				.nombre(beneficiario.getNombre())
				.apellido(beneficiario.getApellido())
				.telefono(beneficiario.getTelefono())
				.email(beneficiario.getEmail())
				.dni(beneficiario.getDni())
				.cuil(beneficiario.getCuil())
				.fechaNacimiento(beneficiario.getFechaNacimiento())
				.estaEliminado(beneficiario.getEstaEliminado())
				.socio(beneficiario.getSocio().getId())
				.build();
	}
}
