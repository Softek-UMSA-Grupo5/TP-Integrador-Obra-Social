package org.softek.g5.entities.consultorio;

import java.util.List;
import java.util.stream.Collectors;

import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoResponseDto;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ConsultorioFactory {
    
	@Inject
	static
	MedicoFactory medicoFactory;
	
    public static Consultorio toEntity(ConsultorioRequestDto dto) {
        Ubicacion ubicacionEntity = UbicacionFactory.toEntity(dto.getUbicacion());
        List<Horario> horarios = dto.getHorarioAtencion().stream()
            .map(HorarioFactory::toEntity)
            .collect(Collectors.toList());
        
        List<Medico> medicos = dto.getMedicos().stream()
                .map(medicoFactory::createEntityFromDto)
                .collect(Collectors.toList());

        return Consultorio.builder()
            .ubicacion(ubicacionEntity)
            .horarioAtencion(horarios)
            .medicos(medicos)
            .build();
    }

    public static ConsultorioResponseDto toDto(Consultorio consultorio) {
        List<HorarioResponseDto> horariosDto = consultorio.getHorarioAtencion().stream()
            .map(HorarioFactory::toDto)
            .collect(Collectors.toList());
        
        List<MedicoResponseDto> medicosDto = consultorio.getMedicos().stream()
                .map(medicoFactory::createResponseFromEntity)
                .collect(Collectors.toList());

        UbicacionResponseDto ubicacionDto = UbicacionFactory.toDto(consultorio.getUbicacion());

        return ConsultorioResponseDto.builder()
            .codigo(consultorio.getCodigo())
            .horarioAtencion(horariosDto)
            .ubicacion(ubicacionDto)
            .estaEliminado(consultorio.isEstaEliminado())
            .medicos(medicosDto)
            .build();
    }
}

