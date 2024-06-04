package org.softek.g5.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioFactory;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.exceptions.entitiesCustomException.ConsultorioNotFoundException;
import org.softek.g5.exceptions.entitiesCustomException.UbicacionNotFoundException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.repositories.UbicacionRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class ConsultorioService {
	
	private final ConsultorioRepository consultorioRepository;
	private final UbicacionRepository ubicacionRepository;
	private final HorarioRepository horarioRepository;
	
	public List<ConsultorioResponseDto> getAllConsultorios() {
        List<Consultorio> consultorios = consultorioRepository.listAll();
        return consultorios.stream()
                .filter(consultorio -> !consultorio.isEstaEliminado())
                .map(ConsultorioFactory::toDto)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ConsultorioResponseDto createConsultorio(ConsultorioRequestDto dto) {
        Ubicacion ubicacion = ubicacionRepository.searchByDetails(dto.getUbicacion().getCiudad(), dto.getUbicacion().getProvincia(),dto.getUbicacion().getDireccion(),dto.getUbicacion().getAltura());

        if (ubicacion == null) {
            throw new UbicacionNotFoundException("Ubicacion no encontrada");
        }

        List<Horario> horarios = dto.getHorarioAtencion().stream()
                .map(HorarioFactory::toEntity)
                .collect(Collectors.toList());

        Consultorio consultorio = Consultorio.builder()
                .ubicacion(ubicacion)
                .estaEliminado(false)
                .build();
        
        for (Horario horario : horarios) {
            horario.setConsultorio(consultorio);
            horarioRepository.persist(horario);
        }
        
        consultorio.setHorarioAtencion(horarios);
        consultorioRepository.persist(consultorio);

        return ConsultorioFactory.toDto(consultorio);
    }
	
    @Transactional
    public void updateConsultorio(String codigo, ConsultorioRequestDto dto) {
        Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
        if (optionalConsultorio.isPresent()) {
            Consultorio consultorio = optionalConsultorio.get();

            consultorio.getHorarioAtencion().clear();
            consultorioRepository.flush(); 

            List<Horario> nuevosHorarios = dto.getHorarioAtencion().stream()
                    .map(HorarioFactory::toEntity)
                    .collect(Collectors.toList());
            nuevosHorarios.forEach(horario -> horario.setConsultorio(consultorio));
            consultorio.getHorarioAtencion().addAll(nuevosHorarios);

            consultorioRepository.persistAndFlush(consultorio); 
        } else {
            throw new ConsultorioNotFoundException("Consultorio no encontrado con código: " + codigo);
        }
    }

	
}
