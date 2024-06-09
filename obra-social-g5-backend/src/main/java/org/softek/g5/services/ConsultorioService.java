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
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.exceptions.entitiesCustomException.consultorio.ConsultorioNotFoundException;
import org.softek.g5.exceptions.entitiesCustomException.horario.HorarioSuperpuestoException;
import org.softek.g5.exceptions.entitiesCustomException.ubicacion.UbicacionNotFoundException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.validation.entitiesValidation.HorarioValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class ConsultorioService {
    @Inject
    private final ConsultorioRepository consultorioRepository;
    @Inject
	private final UbicacionRepository ubicacionRepository;
    @Inject
    private final UbicacionService ubicacionService;
    @Inject
    private final HorarioRepository horarioRepository;
    @Inject
    private final HorarioService horarioService;
    @Inject
    private final MedicoService medicoService;
    @Inject
    private final MedicoFactory medicoFactory;
    @Inject
    private final MedicoRepository medicoRepository;
    @Inject
    private final HorarioValidator horarioValidator;
    @Inject
    private final ConsultorioFactory consultorioFactory;


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
            Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
            if (optionalConsultorio.isPresent()) {
                Consultorio consultorio = optionalConsultorio.get();
                if (consultorio.isEstaEliminado()) {
                    throw new ConsultorioNotFoundException("Consultorio eliminado encontrado con código: " + codigo);
                }
                return ConsultorioFactory.toDto(consultorio);
            } else {
                throw new ConsultorioNotFoundException("Consultorio no encontrado con código: " + codigo);
            }
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
    		List<HorarioRequestDto> horarios = dto.getHorarioAtencion();

    	    if (!HorarioValidator.validateHorarios(horarios)) {
    	        throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
    	    }
    	    

            Consultorio consultorio = ConsultorioFactory.toEntity(dto);

            Ubicacion ubicacion = ubicacionRepository.searchByDetails(consultorio.getUbicacion().getCiudad()
            		, consultorio.getUbicacion().getProvincia()
            		, consultorio.getUbicacion().getCalle()
            		, consultorio.getUbicacion().getAltura());
            
            if(ubicacion == null) {
            	ubicacionService.createUbicacion(dto.getUbicacion());
            	ubicacion = ubicacionRepository.searchByDetails(consultorio.getUbicacion().getCiudad()
                		, consultorio.getUbicacion().getProvincia()
                		, consultorio.getUbicacion().getCalle()
                		, consultorio.getUbicacion().getAltura());
            }
            
            if(dto.getMedico() != null) {
            	Optional<Medico> medico = medicoRepository.findByDni(dto.getMedico().getDni());
            	consultorio.setMedico(medico.get());
            }
            
            consultorio.setUbicacion(ubicacion);
            
            
            consultorioRepository.persist(consultorio);
            
            for (HorarioRequestDto horario : dto.getHorarioAtencion()) {
            	horarioService.createHorario(horario, dto.getUbicacion());
            }
            
            return ConsultorioFactory.toDto(consultorio);
        
    }

    @Transactional
    public void updateConsultorio(String codigo, ConsultorioRequestDto dto) {
        try {
            Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
            if (optionalConsultorio.isPresent()) {
                Consultorio consultorio = optionalConsultorio.get();
                Ubicacion ubicacion = ubicacionRepository.searchByDetails(dto.getUbicacion().getCiudad(),dto.getUbicacion().getProvincia(),dto.getUbicacion().getCalle(),dto.getUbicacion().getAltura());
                
                if (ubicacion == null) {
                    throw new UbicacionNotFoundException("Ubicación no válida: " + dto.getUbicacion());
                }
                consultorio.setUbicacion(ubicacion);
                
                
                consultorio.getHorarioAtencion().clear();
                consultorioRepository.flush();
                
                if (!HorarioValidator.validateHorarios(dto.getHorarioAtencion())) {
                    throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
                }

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

