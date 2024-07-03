package org.softek.g5.entities.socio;
import java.util.ArrayList;
import java.util.List;

import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
import org.softek.g5.entities.socio.dto.SocioRequestDto;
import org.softek.g5.entities.socio.dto.SocioResponseDto;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.repositories.BeneficiarioRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class SocioFactory {
	@Inject
	BeneficiarioFactory beneficiarioFactory;
	
	@Inject
	BeneficiarioRepository beneficiarioRepository;
	
	@Inject
	TurnoMedicoFactory turnoMedicoFactory;
	
	@Inject
	TurnoMedicoRepository turnoMedicoRepository;
	
	public Socio createEntityFromDto(SocioRequestDto dto) {
		return Socio.builder()
				.nombre(dto.getNombre())
				.apellido(dto.getApellido())
				.telefono(dto.getTelefono())
				.email(dto.getEmail())
				.dni(dto.getDni())
				.cuil(dto.getCuil())
				.fechaNacimiento(dto.getFechaNacimiento())
				.nroAfiliado("022-"+dto.getDni()+"-"+dto.getBeneficiarios().size())
				.estaEliminado(false)
				.beneficiarios(null)
				.turnos(null)
				.usuario(null)
				.build();
	}
	
	public SocioResponseDto createResponseFromEntity(Socio socio) {
		return SocioResponseDto.builder()
				.id(socio.getId())
				.nombre(socio.getNombre())
				.apellido(socio.getApellido())
				.telefono(socio.getTelefono())
				.email(socio.getEmail())
				.dni(socio.getDni())
				.cuil(socio.getCuil())
				.fechaNacimiento(socio.getFechaNacimiento())
				.nroAfiliado(socio.getNroAfiliado())
				.estaEliminado(socio.getEstaEliminado())
				.beneficiarios(createListBeneficiarioDtoFromEntity(socio.getBeneficiarios()))
				.usuario(socio.getUsuario().getId())
				.build();
	}
	
	public List<BeneficiarioResponseDto> createListBeneficiarioDtoFromEntity(List<Beneficiario> beneficiarios){
		List<BeneficiarioResponseDto> response = new ArrayList<>();
		if(beneficiarios == null) {
			return response;
		}
    	for (Beneficiario b : beneficiarios) {
    		response.add(beneficiarioFactory.createResponseFromEntity(b));
		}
    	return response;
    }
	
}
