package org.softek.g5.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
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
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class ConsultorioService {
    @Inject
    ConsultorioRepository consultorioRepository;
    @Inject
    UbicacionRepository ubicacionRepository;
    @Inject
    HorarioRepository horarioRepository;

    @Transactional
    public List<ConsultorioResponseDto> getAllConsultorios() {
        try {
            List<Consultorio> consultorios = consultorioRepository.listAll();
            return consultorios.stream()
                    .filter(consultorio -> !consultorio.isEstaEliminado())
                    .map(ConsultorioFactory::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Error al obtener todos los consultorios", e);
        }
    }

    public ConsultorioResponseDto getConsultorioByCodigo(String codigo) {
        try {
            return consultorioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .filter(consultorio -> !consultorio.isEstaEliminado())
                    .map(ConsultorioFactory::toDto)
                    .orElseThrow(() -> new ConsultorioNotFoundException("Consultorio no encontrado"));
        } catch (Exception e) {
            throw new ServiceException("Error al obtener el consultorio por código", e);
        }
    }

    public List<ConsultorioResponseDto> getAllConsultoriosDeleted() {
        try {
            List<Consultorio> consultoriosEliminados = consultorioRepository.listAll();
            return consultoriosEliminados.stream()
                    .filter(Consultorio::isEstaEliminado)
                    .map(ConsultorioFactory::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Error al obtener todos los consultorios eliminados", e);
        }
    }

    @Transactional
    public ConsultorioResponseDto createConsultorio(@Valid ConsultorioRequestDto dto) {
        try {
            Ubicacion ubicacion = ubicacionRepository.searchByDetails(dto.getUbicacion().getCiudad(), dto.getUbicacion().getProvincia(), dto.getUbicacion().getDireccion(), dto.getUbicacion().getAltura());

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
        } catch (Exception e) {
            throw new ServiceException("Error al crear el consultorio", e);
        }
    }

    @Transactional
    public void updateConsultorio(String codigo, ConsultorioRequestDto dto) {
        try {
            Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
            if (optionalConsultorio.isPresent()) {
                Consultorio consultorio = optionalConsultorio.get();
                Ubicacion ubicacion = ubicacionRepository.searchByDetails(dto.getUbicacion().getCiudad(),dto.getUbicacion().getProvincia(),dto.getUbicacion().getDireccion(),dto.getUbicacion().getAltura());
                
                if (ubicacion == null) {
                    throw new UbicacionNotFoundException("Ubicación no válida: " + dto.getUbicacion());
                }
                consultorio.setUbicacion(ubicacion);
                
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
        } catch (Exception e) {
            throw new ServiceException("Error al actualizar el consultorio", e);
        }
    }

    @Transactional
    public boolean deleteConsultorio(String codigo) {
        try {
            Consultorio consultorio = consultorioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new ConsultorioNotFoundException("Consultorio no encontrado con código: " + codigo));

            consultorio.setEstaEliminado(true);
            consultorioRepository.persist(consultorio);
            return true;
        } catch (Exception e) {
            throw new ServiceException("Error al eliminar el consultorio", e);
        }
    }

    @Transactional
    public Response restoreConsultorio(String codigo) {
        try {
            Consultorio consultorio = consultorioRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new ConsultorioNotFoundException("Consultorio no encontrado con código: " + codigo));

            if (consultorio.isEstaEliminado()) {
                consultorio.setEstaEliminado(false);
                consultorioRepository.persist(consultorio);
                return Response.ok("Consultorio restaurado con éxito.").build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity("El consultorio no está eliminado.").build();
            }
        } catch (Exception e) {
            throw new ServiceException("Error al restaurar el consultorio", e);
        }
    }
}

