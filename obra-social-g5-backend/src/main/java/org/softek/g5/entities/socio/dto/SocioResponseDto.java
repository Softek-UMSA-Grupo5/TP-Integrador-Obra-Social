package org.softek.g5.entities.socio.dto;

import java.sql.Date;
import java.util.List;

import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;

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
public class SocioResponseDto {
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private String cuil;
	private Date fechaNacimiento;
	private int nroAfiliado;
	protected Boolean estaEliminado;
	private List<BeneficiarioResponseDto> beneficiarios;
	private List<TurnoMedicoResponseDto> turnos;
}
