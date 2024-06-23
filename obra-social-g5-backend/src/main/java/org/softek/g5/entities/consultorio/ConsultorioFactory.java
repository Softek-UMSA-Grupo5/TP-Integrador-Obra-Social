package org.softek.g5.entities.consultorio;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.softek.g5.entities.consultorio.dto.ConsultorioCreateRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class ConsultorioFactory {

	public static Consultorio toEntity(ConsultorioCreateRequestDto dto) {
		Ubicacion ubicacionEntity = UbicacionFactory.toEntity(dto.getUbicacion());
		List<Horario> horarios = new ArrayList<>();
		if (!dto.getHorarioAtencion().isEmpty()) {
			horarios = dto.getHorarioAtencion().stream().map(HorarioFactory::toEntity).collect(Collectors.toList());
		}
		return Consultorio.builder().ubicacion(ubicacionEntity).horarioAtencion(horarios).medico(null).build();
	}

	public static ConsultorioResponseDto toDto(Consultorio consultorio) {
		List<HorarioResponseDto> horariosDto = new ArrayList<>();
		Long medicoId = 0L;

		if (consultorio.getMedico() != null) {
			medicoId = consultorio.getMedico().getId();
		}

		if (consultorio.getHorarioAtencion() != null && !consultorio.getHorarioAtencion().isEmpty()) {
			horariosDto = consultorio.getHorarioAtencion().stream().map(HorarioFactory::toDto)
					.collect(Collectors.toList());
		}

		UbicacionResponseDto ubicacionDto = UbicacionFactory.toDto(consultorio.getUbicacion());

		return ConsultorioResponseDto.builder().id(consultorio.getId()).codigo(consultorio.getCodigo())
				.horarioAtencion(horariosDto).ubicacion(ubicacionDto).estaEliminado(consultorio.isEstaEliminado())
				.medicoId(medicoId).build();
	}
}
