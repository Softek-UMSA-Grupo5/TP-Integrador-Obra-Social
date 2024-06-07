package org.softek.g5.entities.beneficiario.dto;
import java.sql.Date;
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
public class BeneficiarioRequestDto {
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private int dni;
	private Date fechaNacimiento;
	private String cuil;
}
