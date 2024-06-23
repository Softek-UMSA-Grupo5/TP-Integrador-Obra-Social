package org.softek.g5.entities.medico;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MedicoFactory {
	
	@Inject
	ConsultorioRepository consultorioRepository;
	
	@Inject
	TurnoMedicoRepository turnoMedicoRepository;
	
	@Inject
	TurnoMedicoFactory turnoMedicoFactory;
	
	@Inject
	ConsultorioFactory consultorioFactory;
	
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
				.consultorios(null)
				.turnos(null)
				.estaEliminado(false)
				.build();
	}
	
	public MedicoResponseDto createResponseFromEntity(Medico medico) {
		return MedicoResponseDto.builder()
				.id(medico.getId())
				.nombre(medico.getNombre())
				.apellido(medico.getApellido())
				.telefono(medico.getTelefono())
				.email(medico.getEmail())
				.dni(medico.getDni())
				.cuil(medico.getCuil())
				.fechaNacimiento(medico.getFechaNacimiento())
				.especialidad(medico.getEspecialidad())
				.estaEliminado(medico.getEstaEliminado())
				.build();
	}
	
}
