package org.softek.g5.entities.ubicacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class UbicacionRequestDto {
	@NotBlank
    private String ciudad;
	@NotBlank
    private String provincia;
    @NotBlank
	private String calle;
    @NotNull
    private int altura;
    private String codigo;
}