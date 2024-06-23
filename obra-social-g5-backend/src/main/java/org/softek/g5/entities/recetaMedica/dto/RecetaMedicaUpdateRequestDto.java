package org.softek.g5.entities.recetaMedica.dto;

import java.util.List;

import org.softek.g5.entities.medicamento.dto.MedicamentoUpdateRequestDto;

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
public class RecetaMedicaUpdateRequestDto {

	private Long id;
	@NotNull
	private int cantDiasVigencia;
	@NotNull
	private List<MedicamentoUpdateRequestDto> medicamentos;
	
}
