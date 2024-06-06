package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.entitiesCustomException.UbicacionNotFoundException;
import org.softek.g5.repositories.UbicacionRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class UbicacionService {
    @Inject
    UbicacionRepository ubicacionRepository;

    public List<UbicacionResponseDto> getAllUbicaciones() {
        try {
            List<Ubicacion> ubicaciones = ubicacionRepository.listAll();
            return ubicaciones.stream()
                    .filter(ubicacion -> !ubicacion.isEstaEliminado())
                    .map(UbicacionFactory::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Error al obtener todas las ubicaciones", e);
        }
    }

    public List<UbicacionResponseDto> getAllUbicacionesDeleted() {
    	try {
    		List<Ubicacion> ubicacionesEliminadas =  ubicacionRepository.listAll();
    		return ubicacionesEliminadas.stream()
    				.filter(Ubicacion::isEstaEliminado)
    				.map(UbicacionFactory::toDto)
    				.collect(Collectors.toList());
    	}catch(Exception e) {
    		throw new ServiceException("Error al obtener todas las localidades eliminadas", e);
    	}
    }
    
    public UbicacionResponseDto getUbicacionByCodigo(String codigo) {
        try {
            return ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .filter(ubicacion -> !ubicacion.isEstaEliminado())
                    .map(UbicacionFactory::toDto)
                    .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada o eliminada con código: " + codigo));
        } catch (Exception e) {
            throw new ServiceException("Error al obtener la ubicación por código", e);
        }
    }

    @Transactional
    public UbicacionResponseDto createUbicacion(@Valid UbicacionRequestDto dto) {
    	if (dto == null || dto.getCiudad().isEmpty() || dto.getProvincia().isEmpty() || dto.getDireccion().isEmpty() || dto.getAltura() <= 0) {
    	        throw new IllegalArgumentException("Los parámetros en UbicacionRequestDto no pueden ser nulos o estar en blanco");
    	    }
    	try {
            Ubicacion ubicacion = UbicacionFactory.toEntity(dto);
            ubicacion.setEstaEliminado(false);
            ubicacionRepository.persist(ubicacion);
            return UbicacionFactory.toDto(ubicacion);
        } catch (Exception e) {
            throw new ServiceException("Error al crear la ubicación", e);
        }
    }

    @Transactional
    public UbicacionResponseDto updateUbicacion(String codigo, @Valid UbicacionRequestDto dto) {
        try {
            Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo));

            if (ubicacion.isEstaEliminado()) {
                throw new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo);
            }

            UbicacionFactory.updateEntity(ubicacion, dto);
            ubicacionRepository.persist(ubicacion);
            return UbicacionFactory.toDto(ubicacion);
        } catch (Exception e) {
            throw new ServiceException("Error al actualizar la ubicación", e);
        }
    }

    @Transactional
    public Response deleteUbicacion(String codigo) {
        try {
            Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo));

            ubicacion.setEstaEliminado(true);
            ubicacionRepository.persist(ubicacion);
            return Response.ok("Ubicación eliminada con éxito.").build();
        } catch (Exception e) {
            throw new ServiceException("Error al eliminar la ubicación", e);
        }
    }


    @Transactional
    public Response restoreUbicacion(String codigo) {
        try {
            Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo));

            if (ubicacion.isEstaEliminado()) {
                ubicacion.setEstaEliminado(false);
                ubicacionRepository.persist(ubicacion);
                return Response.ok("Ubicación restaurada con éxito.").build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity("La ubicación no está eliminada.").build();
            }
        } catch (Exception e) {
            throw new ServiceException("Error al restaurar la ubicación", e);
        }
    }
}
