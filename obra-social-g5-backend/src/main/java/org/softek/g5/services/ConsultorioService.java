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
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.HorarioSuperpuestoException;
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
    public List<ConsultorioResponseDto> getAllConsultorios() throws CustomServerException {
        try {
            List<Consultorio> consultorios = consultorioRepository.listAll();
            if (consultorios.isEmpty()){
                throw new EntityNotFoundException("No hay consultorios registrados");
            }
            return consultorios.stream()
                    .filter(consultorio -> !consultorio.isEstaEliminado())
                    .map(ConsultorioFactory::toDto)
                    .collect(Collectors.toList());
        } catch (CustomServerException e) {
            throw new CustomServerException("Error al obtener los consultorios");
        }
    }

    public ConsultorioResponseDto getConsultorioByCodigo(String codigo) throws CustomServerException {
    	try {
            Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
            if (optionalConsultorio.isPresent()) {
                Consultorio consultorio = optionalConsultorio.get();
                if (consultorio.isEstaEliminado()) {
                    throw new EntityNotFoundException("El consultorio está eliminado" + codigo);
                }
                return ConsultorioFactory.toDto(consultorio);
            } else {
                throw new EntityNotFoundException("Consultorio no encontrado con código: " + codigo);
            }
        } catch (CustomServerException e) {
            throw new CustomServerException("Error al obtener el consultorio por código");
        }
    }

    public List<ConsultorioResponseDto> getAllConsultoriosDeleted() throws CustomServerException{
        try {
            List<Consultorio> consultorios = consultorioRepository.listAll();
            List<ConsultorioResponseDto> consultoriosEliminados = consultorios.stream()
                    .filter(Consultorio::isEstaEliminado)
                    .map(ConsultorioFactory::toDto)
                    .collect(Collectors.toList());
            if (consultoriosEliminados.isEmpty()){
                throw new EntityNotFoundException("No hay consultorios eliminados");
            }
            return consultoriosEliminados;
        } catch (CustomServerException e) {
            throw new CustomServerException("Error al obtener los consultorios eliminados");
        }
    }

    @Transactional
    public ConsultorioResponseDto createConsultorio(@Valid ConsultorioRequestDto dto) throws CustomServerException{
        List<HorarioRequestDto> horarios = dto.getHorarioAtencion();

        if (!HorarioValidator.validateHorarios(horarios)) {
            throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
        }

        Consultorio consultorio = ConsultorioFactory.toEntity(dto);

        UbicacionRequestDto ubicacionRequestDto = dto.getUbicacion();
        Ubicacion ubicacion = ubicacionRepository.findByCodigo(ubicacionRequestDto.getCodigo());

        if (ubicacion == null) {
            UbicacionResponseDto ubicacionResponseDto = ubicacionService.createUbicacion(ubicacionRequestDto);
            ubicacion = UbicacionFactory.toEntityFromResponseDto(ubicacionResponseDto);
            ubicacionRepository.persist(ubicacion);
        }

        consultorio.setUbicacion(ubicacion);

        if (dto.getMedico() != null) {
            Optional<Medico> medicoOptional = medicoRepository.findByDni(dto.getMedico().getDni());
            Medico medico;
            if (medicoOptional.isPresent()) {
                medico = medicoOptional.get();
            } else {
                MedicoRequestDto medicoRequestDto = dto.getMedico();
                medico = medicoFactory.createEntityFromDto(medicoRequestDto);
                medicoRepository.persist(medico);
            }
            consultorio.setMedico(medico);
        }

        consultorioRepository.persist(consultorio);

        for (HorarioRequestDto horario : horarios) {
            horarioService.createHorario(horario, ubicacionRequestDto);
        }

        return ConsultorioFactory.toDto(consultorio);
    }
    @Transactional
    public void updateConsultorio(int dniMedico, ConsultorioRequestDto dto) throws CustomServerException {
        try {
            Consultorio consultorio = consultorioRepository.findByUbicacion(dto.getUbicacion().getCiudad(), dto.getUbicacion().getProvincia(), dto.getUbicacion().getCalle(), dto.getUbicacion().getAltura());

            if (consultorio == null) {
                throw new EntityNotFoundException("Consultorio no encontrado");
            }

            Ubicacion ubicacion = ubicacionRepository.findByCodigo(dto.getUbicacion().getCodigo());
            if (ubicacion == null) {
                throw new EntityNotFoundException("Ubicación no válida: ");
            }
            consultorio.setUbicacion(ubicacion);

            Medico medico = medicoRepository.findByDniMedico(dniMedico);
            if (medico == null) {
                throw new EntityNotFoundException("Medico no encontrado");
            }
            consultorio.setMedico(medico);

            consultorio.getHorarioAtencion().clear();
            consultorioRepository.flush();

            if (!HorarioValidator.validateHorarios(dto.getHorarioAtencion())) {
                throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
            }

            List<Horario> nuevosHorarios = dto.getHorarioAtencion().stream()
                    .map(HorarioFactory::toEntity)
                    .toList();
            nuevosHorarios.forEach(horario -> horario.setConsultorio(consultorio));
            consultorio.getHorarioAtencion().addAll(nuevosHorarios);

            consultorioRepository.persistAndFlush(consultorio);
        } catch (EntityNotFoundException | HorarioSuperpuestoException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomServerException("Error al actualizar el consultorio", e);
        }
    }

    @Transactional
    public boolean deleteConsultorio(String codigo) throws CustomServerException {
        try {
            Optional<Consultorio> consultorioOptional = consultorioRepository.findByCodigo(codigo);
            if (consultorioOptional.isEmpty()) {
                throw new EntityNotFoundException("Consultorio no encontrado");
            }

            Consultorio consultorio = consultorioOptional.get();
            if (consultorio.isEstaEliminado()) {
                throw new EntityNotFoundException("El consultorio ya está eliminado");
            }

            consultorio.setEstaEliminado(true);
            consultorioRepository.persist(consultorio);
            return true;
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomServerException("Error al eliminar el consultorio");
        }
    }

    @Transactional
    public Response restoreConsultorio(String codigo) throws CustomServerException {
        try {
            Optional<Consultorio> consultorioOptional = consultorioRepository.findByCodigo(codigo);

            if (consultorioOptional.isEmpty()) {
                throw new EntityNotFoundException("Consultorio no encontrado");
            }

            Consultorio consultorio = consultorioOptional.get();

            if (!consultorio.isEstaEliminado()) {
                throw new EntityNotFoundException("El consultorio no está eliminado");
            }

            consultorio.setEstaEliminado(false);
            consultorioRepository.persist(consultorio);

            return Response.ok("Consultorio restaurado con éxito.").build();
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomServerException("Error al restaurar el consultorio", e);
        }
    }

}

