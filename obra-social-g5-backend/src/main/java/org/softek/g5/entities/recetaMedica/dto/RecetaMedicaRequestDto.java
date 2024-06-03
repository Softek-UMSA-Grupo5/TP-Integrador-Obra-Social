package org.softek.g5.entities.recetaMedica.dto;


import java.util.List;

import org.softek.g5.entities.medicamento.Medicamento;

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
public class RecetaMedicaRequestDto {

	private int cantDiasVigencia;
	private List<Medicamento> medicamentos;
	
}
