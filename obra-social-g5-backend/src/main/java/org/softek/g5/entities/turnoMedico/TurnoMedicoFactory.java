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
				.build();
	}

	public TurnoMedicoResponseDto createResponseFromEntity(TurnoMedico turnoMedico) {
		return TurnoMedicoResponseDto.builder()
				.codigo(turnoMedico.getCodigo())
				.fecha(turnoMedico.getFecha())
				.hora(turnoMedico.getHora())
				.minutos(turnoMedico.getMinutos())
				.estado(turnoMedico.getEstado())
				.motivoConsulta(turnoMedico.getMotivoConsulta())
				.build();
	}

}
