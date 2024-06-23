package org.softek.g5.services;

import java.util.List;

import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityExistException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.validation.entitiesValidation.UbicacionValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class UbicacionService {
	@Inject
	UbicacionRepository ubicacionRepository;

	public List<Ubicacion> getAllUbicaciones() throws CustomServerException {
		try {
			List<Ubicacion> ubicaciones = ubicacionRepository.listAll();

			if (ubicaciones.isEmpty()) {
				throw new EntityNotFoundException("No hay registro de Ubicaciones");
			}

			return ubicaciones;
		} catch (Exception e) {
			throw new CustomServerException("Error al obtener todas las ubicaciones");
		}
	}

	public Ubicacion getUbicacionByCodigo(String codigo) throws CustomServerException {
		try {
			
			Ubicacion ubicacion = ubicacionRepository.findByCodigo(codigo);

			if (ubicacion == null) {
				throw new EntityNotFoundException("No hay registro de Ubicaciones");
			}

			return ubicacion;
			
		} catch (Exception e) {
			throw new CustomServerException("Error al obtener la ubicación por código", e);
		}
	}

	@Transactional
	public Ubicacion createUbicacion(UbicacionRequestDto dto) throws CustomServerException {
		
		if (!UbicacionValidator.validateUbicacionRequestDto(dto)) {
			throw new IllegalArgumentException("Los parámetros en UbicacionRequestDto no son válidos");
		}
		
		try {
			
			Ubicacion ubicacion = UbicacionFactory.toEntity(dto);
			
			Ubicacion existUbicacion = ubicacionRepository.searchByDetails(dto.getCiudad(), dto.getProvincia(),
					dto.getCalle(), dto.getAltura());
			
			if (existUbicacion != null) {
				throw new EntityExistException("Ubicación ya existe");
			}
			
			ubicacion.persist();
			
			return ubicacion;
			
		} catch (CustomServerException e) {
			throw new CustomServerException("Error al crear la ubicación", e);
		}
		
	}

	@Transactional
	public Ubicacion updateUbicacion(String codigo, @Valid UbicacionRequestDto dto)
			throws CustomServerException {
		
		if (!UbicacionValidator.validateUbicacionRequestDto(dto)) {
			throw new IllegalArgumentException("Los parámetros en UbicacionRequestDto no son válidos");
		}
		
		try {
			
			Ubicacion ubicacion = ubicacionRepository.findByCodigo(codigo);
			
			if (ubicacion == null) {
				throw new EntityNotFoundException("Ubicación no encontrada ");
			}

			ubicacion.setCiudad(dto.getCiudad());
			ubicacion.setProvincia(dto.getProvincia());
		    ubicacion.setCalle(dto.getCalle());
		    ubicacion.setAltura(dto.getAltura());
			
			return ubicacion;
			
		} catch (Exception e) {
			throw new CustomServerException("Error al actualizar la ubicación", e);
		}
	}

	@Transactional
	public void deleteUbicacion(Long id) throws CustomServerException {
		
		try {

			int updatedRows = this.ubicacionRepository.update(
					"estaEliminado = true WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un medicamento");
		}
		
	}

	@Transactional
	public void restoreUbicacion(Long id) throws CustomServerException {
		
		try {

			int updatedRows = this.ubicacionRepository.update(
					"estaEliminado = false WHERE id = ?1", id);
			if (updatedRows == 0) {
				throw new EntityNotFoundException("Medicamento no encontrado");
			}

		} catch (CustomServerException e) {
			throw new CustomServerException("Error al eliminar un medicamento");
		}
		
	}
}
