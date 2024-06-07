package org.softek.g5.entities.medico;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicoFactory {
	public Medico createEntityFromDto(MedicoRequestDto dto) {
		return Medico.builder()
				.nombre(dto.getNombre())
				.apellido(dto.getApellido())
				.telefono(dto.getTelefono())
				.email(dto.getEmail())
				.dni(dto.getDni())
				.cuil(dto.getCuil())
				.fechaNacimiento(dto.getFechaNacimiento())
				.especialidad(dto.getEspecialidad())
				.consultorio(dto.getConsultorio())
				.estaEliminado(false)
				.build();
	}
	
	public MedicoResponseDto createResponseFromEntity(Medico medico) {
		return MedicoResponseDto.builder()
				.nombre(medico.getNombre())
				.apellido(medico.getApellido())
				.telefono(medico.getTelefono())
				.email(medico.getEmail())
				.dni(medico.getDni())
				.cuil(medico.getCuil())
				.fechaNacimiento(medico.getFechaNacimiento())
				.especialidad(medico.getEspecialidad())
				.consultorio(medico.getConsultorio())
				.estaEliminado(medico.getEstaEliminado())
				.build();
	}
}
