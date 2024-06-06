package org.softek.g5.entities.medicamento.dto;


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

	private String nombre;
    private String concentracion;
    private String formaFarmaceutica;
    private String frecuencia;
    private String duracion;
    private String instrucciones;
	
}
