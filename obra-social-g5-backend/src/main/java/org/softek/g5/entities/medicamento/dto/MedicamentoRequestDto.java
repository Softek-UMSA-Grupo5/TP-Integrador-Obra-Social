package org.softek.g5.entities.medicamento.dto;

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
public class MedicamentoRequestDto {

	private String medicacion;
    private String posología;
    private String frecuencia;
    private String duracion;
    private String instrucciones;
	
}
