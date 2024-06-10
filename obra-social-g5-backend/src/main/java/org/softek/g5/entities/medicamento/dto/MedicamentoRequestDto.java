package org.softek.g5.entities.medicamento.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MedicamentoRequestDto {

	@NotNull
	private String nombre;
	@NotNull
    private String concentracion;
	@NotNull
    private String formaFarmaceutica;
	@NotNull
    private String frecuencia;
	@NotNull
    private String duracion;
	@NotNull
    private String instrucciones;
	
}
