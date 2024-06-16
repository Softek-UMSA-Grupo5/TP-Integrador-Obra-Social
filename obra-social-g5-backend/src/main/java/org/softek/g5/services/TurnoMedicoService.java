package org.softek.g5.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityExistException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.SocioRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;
import org.softek.g5.validation.DataValidator;
import org.softek.g5.validation.entitiesValidation.TurnoMedicoValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class TurnoMedicoService {

	@Inject
	TurnoMedicoRepository turnoMedicoRepository;

	@Inject
	TurnoMedicoFactory turnoMedicoFactory;

	@Inject
	RecetaMedicaService recetaMedicaService;

	@Inject
	SocioRepository socioRepository;

	@Inject
	MedicoRepository medicoRepository;

	public List<TurnoMedicoResponseDto> getTurnoMedico() throws CustomServerException {

		try {

			List<TurnoMedico> listTurnoMedico = turnoMedicoRepository.listAll();

			if (listTurnoMedico.isEmpty()) {
				throw new EntityNotFoundException("No hay registros de turnos médicos");
			}

			List<TurnoMedicoResponseDto> response = new ArrayList<>();

			for (TurnoMedico tm : listTurnoMedico) {
				response.add(turnoMedicoFactory.createResponseFromEntity(tm));
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener las recetas medicas");
		}

	}

	public TurnoMedicoResponseDto getTurnoMedicoByCodigo(String codigoTurno) throws CustomServerException {

		try {

			Optional<TurnoMedico> optionalTurnoMedico = turnoMedicoRepository.findByCodigo(codigoTurno);

			if (optionalTurnoMedico.isEmpty()) {
				throw new EntityNotFoundException("No se encontró el turno medico");
			}

			TurnoMedicoResponseDto response = turnoMedicoFactory.createResponseFromEntity(optionalTurnoMedico.get());

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}

	}

	public List<TurnoMedicoResponseDto> getTurnoMedicoBySocio(Long idSocio) throws CustomServerException {

		try {

			List<TurnoMedico> listTurnoMedico = turnoMedicoRepository.findBySocio(idSocio);

			if (listTurnoMedico.isEmpty()) {
				throw new EntityNotFoundException("No se encontrarón turnos para el socio de id " + idSocio);
			}

			List<TurnoMedicoResponseDto> response = new ArrayList<>();

			for (TurnoMedico tm : listTurnoMedico) {
				response.add(turnoMedicoFactory.createResponseFromEntity(tm));
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}

	}

	public List<TurnoMedicoResponseDto> getTurnoMedicoByMedico(Long idMedico) throws CustomServerException {

		try {

			List<TurnoMedico> listTurnoMedico = turnoMedicoRepository.findByMedico(idMedico);

			if (listTurnoMedico.isEmpty()) {
				throw new EntityNotFoundException("No se encontrarón turnos para el medico de id " + idMedico);
			}

			List<TurnoMedicoResponseDto> response = new ArrayList<>();

			for (TurnoMedico tm : listTurnoMedico) {
				response.add(turnoMedicoFactory.createResponseFromEntity(tm));
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener la receta medica");
		}

	}

	public List<TurnoMedicoResponseDto> getTurnoMedicoBetweenDates(String fechaDesde, String fechaHasta)
			throws CustomServerException {

		try {

			LocalDate fd = LocalDate.parse(fechaDesde);
			LocalDate fh = LocalDate.parse(fechaHasta);

			if (fd.isAfter(LocalDate.now()) || fh.isAfter(LocalDate.now()) || fd.isAfter(fh)) {
				throw new InvalidDataRequest("Fecha desde no puede ser mayor a fecha hasta o al día actual");
			}

			List<TurnoMedico> listTurnoMedico = turnoMedicoRepository.findBetweenDates(fd, fh);

			if (listTurnoMedico.isEmpty()) {
				throw new EntityNotFoundException("No se encontraron turnos médicos entre esas fechas");
			}

			List<TurnoMedicoResponseDto> response = new ArrayList<>();

			for (TurnoMedico tm : listTurnoMedico) {
				response.add(turnoMedicoFactory.createResponseFromEntity(tm));
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al obtener las recetas medicas");
		}

	}

	@Transactional
	public List<TurnoMedicoResponseDto> persistTurnoMedico(List<TurnoMedicoRequestDto> dtos)
			throws CustomServerException {

		try {

			List<TurnoMedicoResponseDto> response = new ArrayList<>();

			for (TurnoMedicoRequestDto dto : dtos) {

				DataValidator.validateDtoFields(dto);

				if (!TurnoMedicoValidator.validateRequestDto(dto)) {
					throw new InvalidDataRequest("Los datos de turno medico enviados son erroneos");
				}

				TurnoMedico turnoMedico = turnoMedicoFactory.createEntityFromDto(dto);
				Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigoAndDisponibility(turnoMedico.getCodigo());
				if (optionalturnoMedico.isPresent()) {
					throw new EntityExistException("Este turno ya está ocupado");
				}

				Optional<Medico> optionalMedico = medicoRepository.findByDni(dto.getMedico().getDni());

				if (optionalMedico.isEmpty()) {
					throw new EntityNotFoundException("No se encontró al medico");
				}

				Optional<Socio> optionalSocio = socioRepository.findByDni(dto.getSocio().getDni());

				if (optionalSocio.isEmpty()) {
					throw new EntityNotFoundException("No se encontró al socio");
				}

				turnoMedico.setMedico(optionalMedico.get());
				turnoMedico.setSocio(optionalSocio.get());

				this.turnoMedicoRepository.persist(turnoMedico);

				response.add(turnoMedicoFactory.createResponseFromEntity(turnoMedico));
			}

			return response;

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al guardar el turno médico");
		}

	}

	@Transactional
	public void updateTurnoMedico(String codigo, TurnoMedicoRequestDto dto) throws CustomServerException {

		try {

			DataValidator.validateDtoFields(dto);

			if (!TurnoMedicoValidator.validateRequestDto(dto)) {
				throw new InvalidDataRequest("Los datos de turno medico enviados son erroneos");
			}

			Optional<TurnoMedico> optionalturnoMedico = turnoMedicoRepository.findByCodigo(codigo);

			if (optionalturnoMedico.isEmpty()) {
				throw new EntityNotFoundException("Turno médico no encontrado");
			}
			
			TurnoMedico turnoMedico = optionalturnoMedico.get();
			
			Optional<Medico> optionalMedico = medicoRepository.findByDni(dto.getMedico().getDni());

			if (optionalMedico.isEmpty()) {
				throw new EntityNotFoundException("No se encontró al medico");
			}

			Optional<Socio> optionalSocio = socioRepository.findByDni(dto.getSocio().getDni());

			if (optionalSocio.isEmpty()) {
				throw new EntityNotFoundException("No se encontró al socio");
			}

			turnoMedico.setEstado(dto.getEstado());
			turnoMedico.setFecha(dto.getFecha());
			turnoMedico.setHora(dto.getHora());
			turnoMedico.setMinutos(dto.getMinutos());
			turnoMedico.setMotivoConsulta(dto.getMotivoConsulta());
			if(turnoMedico.getRecetaMedica() == null) {
				recetaMedicaService.persistRecetaMedica(codigo, dto.getRecetaMedica());
			}else {
				recetaMedicaService.updateRecetaMedica(codigo, dto.getRecetaMedica());
			}
			turnoMedico.setMedico(optionalMedico.get());
			turnoMedico.setSocio(optionalSocio.get());

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al guardar la receta medica");
		}

	}

	@Transactional
	public void deleteTurnoMedico(String codigo) throws CustomServerException{
		
		try {
			
			int updatedRows = this.turnoMedicoRepository.update("estado = ?1, estaDisponible = ?2 WHERE codigo = ?3",
					TurnoMedicoEstadoEnum.CANCELADA, 1, codigo);
			recetaMedicaService.deleteRecetaMedica(turnoMedicoRepository.findByCodigo(codigo).get().getRecetaMedica().getCodigo());
			if (updatedRows == 0) {
				throw new EntityNotFoundException("turnoMedico no encontrado");
			}
			
		} catch(CustomServerException e) {
			throw new CustomServerException("Error al eliminar el turno médico");
		}
		
	}

}
