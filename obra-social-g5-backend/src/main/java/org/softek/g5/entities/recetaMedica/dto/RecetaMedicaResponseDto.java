package org.softek.g5.entities.recetaMedica.dto;

import java.time.LocalDate;
import java.util.List;

import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;

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
public class RecetaMedicaResponseDto {

	private Long id;
	private String codigo;
	private LocalDate fechaEmision;
    private LocalDate ultimaModificacion;
    private int cantDiasVigencia;
    private Boolean estaEliminado;
    private List<MedicamentoResponseDto> medicamentos;
    private Long turnoId;
	
}
