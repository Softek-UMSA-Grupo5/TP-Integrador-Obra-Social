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
				.usuario(null)
				.build();
	}

	public MedicoResponseDto createResponseFromEntity(Medico medico) {
		MedicoResponseDto dto = new MedicoResponseDto();
		dto.setId(medico.getId());
		dto.setNombre(medico.getNombre());
		dto.setApellido(medico.getApellido());
		dto.setTelefono(medico.getTelefono());
		dto.setEmail(medico.getEmail());
		dto.setDni(medico.getDni());
		dto.setCuil(medico.getCuil());
		dto.setFechaNacimiento(medico.getFechaNacimiento());
		dto.setEstaEliminado(medico.getEstaEliminado());
		dto.setEspecialidad(medico.getEspecialidad());

		if (medico.getUsuario() != null) {
			dto.setUsuario(medico.getUsuario().getId());
		} else {
			dto.setUsuario(null);
		}

		return dto;
	}


}
