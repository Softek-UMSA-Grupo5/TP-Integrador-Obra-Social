package org.softek.g5.services;

import java.util.List;
import java.util.stream.Collectors;

import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.entitiesCustomException.UbicacionNotFoundException;
import org.softek.g5.repositories.UbicacionRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class UbicacionService {
    private final UbicacionRepository ubicacionRepository;

    public List<UbicacionResponseDto> getAllUbicaciones() {
        List<Ubicacion> ubicaciones = ubicacionRepository.listAll();
        return ubicaciones.stream()
                .filter(ubicacion -> !ubicacion.isEstaEliminado())
                .map(UbicacionFactory::toDto)
                .collect(Collectors.toList());
    }

    public UbicacionResponseDto getUbicacionByCodigo(String codigo) {
        return ubicacionRepository.find("codigo", codigo)
                .firstResultOptional()
                .filter(ubicacion -> !ubicacion.isEstaEliminado())
                .map(UbicacionFactory::toDto)
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada o eliminada con código: " + codigo));
    }

    @Transactional
    public UbicacionResponseDto createUbicacion(@Valid UbicacionRequestDto dto) {
        Ubicacion ubicacion = UbicacionFactory.toEntity(dto);
        ubicacion.setEstaEliminado(false);
        ubicacionRepository.persist(ubicacion);
        return UbicacionFactory.toDto(ubicacion);
    }

    @Transactional
    public UbicacionResponseDto updateUbicacion(String codigo, @Valid UbicacionRequestDto dto) {
        Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                .firstResultOptional()
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo));

        if (ubicacion.isEstaEliminado()) {
            throw new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo);
        }

        UbicacionFactory.updateEntity(ubicacion, dto);
        ubicacionRepository.persist(ubicacion);
        return UbicacionFactory.toDto(ubicacion);
    }

    @Transactional
    public boolean deleteUbicacion(String codigo) {
        Ubicacion ubicacion = ubicacionRepository.find("codigo", codigo)
                .firstResultOptional()
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada con código: " + codigo));

        ubicacion.setEstaEliminado(true);
        ubicacionRepository.persist(ubicacion);
        return true;
    }

    @Transactional
    public Response restoreUbicacion(String codigo) {
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
    }
}