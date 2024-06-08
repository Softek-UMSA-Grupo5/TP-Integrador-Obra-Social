package org.softek.g5.entities.turnoMedico;

import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.repositories.TurnoMedicoRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class TurnoMedicoFactory {

	@Inject
	TurnoMedicoRepository turnoMedicoRepository;

	public TurnoMedico createEntityFromDto(TurnoMedicoRequestDto dto) {
		return TurnoMedico.builder()
				.codigo("turno-" + (turnoMedicoRepository.count() + 1))
				.fecha(dto.getFecha())
				.hora(dto.getHora())
				.minutos(dto.getMinutos())
				.estado(TurnoMedicoEstadoEnum.PENDIENTE)
				.motivoConsulta(dto.getMotivoConsulta())
				.estaDisponible(false)
				.recetaMedica(null)
				.build();
	}

	public TurnoMedicoResponseDto createResponseFromEntity(TurnoMedico turnoMedico) {
		Long recetaId = 0L;
		if(turnoMedico.getRecetaMedica() != null) {
			recetaId = turnoMedico.getRecetaMedica().getId();
		}
		
		return TurnoMedicoResponseDto.builder()
				.codigo(turnoMedico.getCodigo())
				.fecha(turnoMedico.getFecha())
				.hora(turnoMedico.getHora())
				.minutos(turnoMedico.getMinutos())
				.estado(turnoMedico.getEstado())
				.motivoConsulta(turnoMedico.getMotivoConsulta())
				.estaDisponible(turnoMedico.getEstaDisponible())
				.recetaMedica(recetaId)
				.socioId(turnoMedico.getSocio().getId())
				.medicoId(turnoMedico.getMedico().getId())
				.build();
	}

}
