package org.softek.g5.entities.ubicacion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UbicacionResponseDto {
	
	private Long id;
    private String ciudad;
    private String provincia;
    private String calle;
    private int altura;
    private boolean estaEliminado;
    private String codigo;
    
}