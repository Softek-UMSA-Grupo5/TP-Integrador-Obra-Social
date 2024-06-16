package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.entitiesCustomException.ubicacion.UbicacionNotFoundException;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.validation.entitiesValidation.UbicacionValidator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class UbicacionService {
    @Inject
    UbicacionRepository ubicacionRepository;

    public List<UbicacionResponseDto> getAllUbicaciones() throws CustomServerException{
        try {
            List<Ubicacion> ubicaciones = ubicacionRepository.listAll();
            if (ubicaciones.isEmpty()){
                throw new EntityNotFoundException("No hay registro de Ubicaciones");
            }
            return ubicaciones.stream().filter(ubicacion -> !ubicacion.isEstaEliminado()).map(UbicacionFactory::toDto).toList();
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al obtener todas las ubicaciones");
        }
    }

    public List<UbicacionResponseDto> getAllUbicacionesDeleted() throws CustomServerException{
    	try {
    		List<Ubicacion> ubicaciones =  ubicacionRepository.listAll();
            if (ubicaciones.isEmpty()){
                throw new EntityNotFoundException("No hay registro de Ubicaciones");
            }
            List<UbicacionResponseDto> ubicacionesEliminadas = ubicaciones.stream().filter(Ubicacion::isEstaEliminado).map(UbicacionFactory::toDto).toList();
            if (ubicacionesEliminadas.isEmpty()){
                throw new EntityNotFoundException("No hay ubicaciones eliminadas");
            }
    		return ubicacionesEliminadas;
    	}catch (EntityNotFoundException e){
            throw e;
        }catch(Exception e) {
    		throw new CustomServerException("Error al obtener todas las localidades eliminadas", e);
    	}
    }
    
    public UbicacionResponseDto getUbicacionByCodigo(String codigo) throws CustomServerException{
        try {
            return ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .filter(ubicacion -> !ubicacion.isEstaEliminado())
                    .map(UbicacionFactory::toDto)
                    .orElseThrow(() -> new EntityNotFoundException("Ubicación no encontrada o eliminada con código: " + codigo));
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al obtener la ubicación por código", e);
        }
    }

    @Transactional
    public UbicacionResponseDto createUbicacion(UbicacionRequestDto dto) throws CustomServerException{
        if (!UbicacionValidator.validateUbicacionRequestDto(dto)) {
            throw new IllegalArgumentException("Los parámetros en UbicacionRequestDto no son válidos");
        }
        try {
            Ubicacion ubicacion = UbicacionFactory.toEntity(dto);
            ubicacion.setEstaEliminado(false);
            ubicacionRepository.persist(ubicacion);
            return UbicacionFactory.toDto(ubicacion);
        } catch (CustomServerException e) {
            throw new CustomServerException("Error al crear la ubicación", e);
        }
    }
    @Transactional
    public UbicacionResponseDto updateUbicacion(String codigo, @Valid UbicacionRequestDto dto) throws CustomServerException {
        if (!UbicacionValidator.validateUbicacionRequestDto(dto)) {
            throw new IllegalArgumentException("Los parámetros en UbicacionRequestDto no son válidos");
        }
        try {
            Ubicacion ubicacion = ubicacionRepository.findByCodigo(codigo);
            if (ubicacion == null) {
                throw new EntityNotFoundException("Ubicación no encontrada ");
            }

            if (ubicacion.isEstaEliminado()) {
                throw new EntityNotFoundException("La ubicación esta eliminada");
            }

            UbicacionFactory.updateEntity(ubicacion, dto);
            ubicacionRepository.persist(ubicacion);
            return UbicacionFactory.toDto(ubicacion);
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al actualizar la ubicación", e);
        }
    }
    @Transactional
    public Response deleteUbicacion(String codigo) throws CustomServerException {
        try {
            Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo).firstResultOptional()
                    .orElseThrow(() -> new EntityNotFoundException("No se encuentra la ubicación"));

            if (ubicacion.isEstaEliminado()) {
                throw new EntityNotFoundException("La ubicación ya está eliminada");
            }

            ubicacion.setEstaEliminado(true);
            ubicacionRepository.persist(ubicacion);
            return Response.ok("Ubicación eliminada con éxito.").build();
        } catch (EntityNotFoundException e) {
            throw e;
        }catch (Exception e) {
            throw new CustomServerException("Error al eliminar la ubicación", e);
        }
    }
    @Transactional
    public Response restoreUbicacion(String codigo) throws CustomServerException{
        try {
            Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                    .firstResultOptional()
                    .orElseThrow(() -> new EntityNotFoundException("Ubicación no encontrada"));

            if (ubicacion.isEstaEliminado()) {
                ubicacion.setEstaEliminado(false);
                ubicacionRepository.persist(ubicacion);
                return Response.ok("Ubicación restaurada con éxito.").build();
            } else {
                throw new EntityNotFoundException("La ubicación no está eliminada");
            }
        }catch (EntityNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new ServiceException("Error al restaurar la ubicación", e);
        }
    }
}
