package org.softek.g5.services;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.consultorio.dto.ConsultorioCreateRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioUpdateRequestDto;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioUpdateRequestDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.HorarioSuperpuestoException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.validation.entitiesValidation.HorarioValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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
	private final HorarioService horarioService;
	@Inject
	private final MedicoRepository medicoRepository;

	@Transactional
	public List<Consultorio> getAllConsultorios() throws CustomServerException {

		try {
			List<Consultorio> consultorios = consultorioRepository.listAll();

			if (consultorios.isEmpty()) {
				throw new EntityNotFoundException("No hay consultorios registrados");
			}

			return consultorios;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener los consultorios");
		}

	}

	public Consultorio getConsultorioByCodigo(String codigo) throws CustomServerException {

		try {
			Optional<Consultorio> optionalConsultorio = consultorioRepository.findByCodigo(codigo);
			if (optionalConsultorio.isEmpty()) {
				throw new EntityNotFoundException("Consultorio no encontrado con código: " + codigo);
			}
			Consultorio consultorio = optionalConsultorio.get();
			
			return consultorio;
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener el consultorio por código");
		}

	}

	@Transactional
	public Consultorio createConsultorio(@Valid ConsultorioCreateRequestDto dto)
			throws CustomServerException {
		
		List<HorarioRequestDto> horarios = dto.getHorarioAtencion();

		if (!HorarioValidator.validateHorarios(horarios)) {
			throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
		}
		
		//Falta validar datos del dto

		Consultorio consultorio = ConsultorioFactory.toEntity(dto);

		Ubicacion ubicacion;
		
		if (dto.getUbicacion().getId() != null) {
			ubicacion = ubicacionRepository.findById(dto.getUbicacion().getId());
		}else {
			ubicacion = ubicacionService.createUbicacion(dto.getUbicacion());
		}

		consultorio.setUbicacion(ubicacion);

		if (dto.getMedicoId() != null) {
			Optional<Medico> medicoOptional = medicoRepository.findByIdOptional(dto.getMedicoId());

			if (medicoOptional.isEmpty()) {
				throw new EntityNotFoundException("No se encontró al médico");
			}

			consultorio.setMedico(medicoOptional.get());
		}

		consultorio.persist();

		for (HorarioRequestDto horarioRequestDto : horarios) {
			horarioService.createHorario(horarioRequestDto, consultorio.getId());
		}
		return consultorio;
		
	}

	@Transactional
	public void updateConsultorio(ConsultorioUpdateRequestDto dto) throws CustomServerException {
		try {
			Consultorio consultorio = consultorioRepository.findById(dto.getId());

			if (consultorio == null) {
				throw new EntityNotFoundException("Consultorio no encontrado");
			}

			Ubicacion ubicacion = ubicacionRepository.findById(dto.getUbicacion().getId());
			if (ubicacion == null) {
				throw new EntityNotFoundException("Ubicación no válida: ");
			}
			
			consultorio.setUbicacion(ubicacion);

			Medico medico = medicoRepository.findById(dto.getMedicoId());
			if (medico == null) {
				throw new EntityNotFoundException("Medico no encontrado");
			}
			consultorio.setMedico(medico);

			if (!HorarioValidator.validateHorarios(dto.getHorarioAtencion())) {
				throw new HorarioSuperpuestoException("Los horarios no pueden superponerse");
			}

			for(HorarioUpdateRequestDto h : dto.getHorarioAtencion()) {
				horarioService.updateHorario(h);
			}
			
		} catch (Exception e) {
			throw new CustomServerException("Error al actualizar el consultorio", e);
		}
	}

	@Transactional
	public void deleteConsultorio(Long id) throws CustomServerException {
		
		try {

			int updatedRows = consultorioRepository.update(
					"estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Consultorio no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un consultorio");
		}
		
	}

	@Transactional
	public void restoreConsultorio(Long id) throws CustomServerException {
		
		try {

			int updatedRows = consultorioRepository.update(
					"estaEliminado = false WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Consultorio no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un consultorio");
		}
		
	}

}
