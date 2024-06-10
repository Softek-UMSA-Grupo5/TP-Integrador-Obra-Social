package org.softek.g5.entities.medico;
import java.util.ArrayList;
import java.util.List;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
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
				.nombre(medico.getNombre())
				.apellido(medico.getApellido())
				.telefono(medico.getTelefono())
				.email(medico.getEmail())
				.dni(medico.getDni())
				.cuil(medico.getCuil())
				.fechaNacimiento(medico.getFechaNacimiento())
				.especialidad(medico.getEspecialidad())
				.consultorios(createListConsultorioDtoFromEntity(medico.getConsultorios()))
				.turnos(createListTurnoMedicoDtoFromEntity(medico.getTurnos()))
				.estaEliminado(medico.getEstaEliminado())
				.build();
	}
	
	public List<ConsultorioResponseDto> createListConsultorioDtoFromEntity(List<Consultorio> consultorios){
		List<ConsultorioResponseDto> response = new ArrayList<>();
		if(consultorios == null || consultorios.isEmpty()) {
			return response;
		}
    	for (Consultorio c : consultorios) {
    		response.add(ConsultorioFactory.toDto(c));
		}
    	return response;
    }
	
	public List<TurnoMedicoResponseDto> createListTurnoMedicoDtoFromEntity(List<TurnoMedico> turnos){
		List<TurnoMedicoResponseDto> response = new ArrayList<>();
		if(turnos == null || turnos.isEmpty()) {
			return response;
		}
    	for (TurnoMedico t : turnos) {
    		response.add(turnoMedicoFactory.createResponseFromEntity(t));
		}
    	return response;
    }
	
}
