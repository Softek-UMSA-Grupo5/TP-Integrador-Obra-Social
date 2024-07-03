package org.softek.g5.entities.ubicacion;

import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UbicacionFactory {
    
    public static Ubicacion toEntity(UbicacionRequestDto dto) {
        return Ubicacion.builder()
            .ciudad(dto.getCiudad())
            .provincia(dto.getProvincia())
            .calle(dto.getCalle())
            .altura(dto.getAltura())
            .estaEliminado(false)
            .build();
    }
    
     public static UbicacionResponseDto toDto(Ubicacion ubicacion) {
    	 if (ubicacion == null) {
    	        return null;
    	    }
    	 	
        return UbicacionResponseDto.builder()
        		.id(ubicacion.getId())
            .codigo(ubicacion.getCodigo())
            .ciudad(ubicacion.getCiudad())
            .provincia(ubicacion.getProvincia())
            .calle(ubicacion.getCalle())
            .altura(ubicacion.getAltura())
            .estaEliminado(ubicacion.isEstaEliminado())
            .build();

        }
     
}