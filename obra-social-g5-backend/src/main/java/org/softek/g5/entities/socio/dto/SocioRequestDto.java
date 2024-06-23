package org.softek.g5.entities.socio.dto;
import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;

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
public class SocioRequestDto {
	
	@NotNull
	private String nombre;
	@NotNull
	private String apellido;
	@NotNull
	private String telefono;
	@NotNull
	private String email;
	@NotNull
	private int dni;
	@NotNull
	private String cuil;
	@NotNull
	private Date fechaNacimiento;
	private List<BeneficiarioRequestDto> beneficiarios;
	
}
