package org.softek.g5.services;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.lang.reflect.InvocationTargetException;
import org.softek.g5.entities.beneficiario.Beneficiario;
import org.softek.g5.entities.beneficiario.BeneficiarioFactory;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioRequestDto;
import org.softek.g5.entities.beneficiario.dto.BeneficiarioResponseDto;
import org.softek.g5.entities.socio.Socio;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.BeneficiarioNotFoundException;
import org.softek.g5.repositories.BeneficiarioRepository;
import org.softek.g5.repositories.SocioRepository;
import org.apache.commons.beanutils.BeanUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class BeneficiarioService {
	@Inject
	BeneficiarioRepository beneficiarioRepository;
	
	@Inject
	BeneficiarioFactory beneficiarioFactory;
	
	@Inject
	SocioRepository socioRepository;
	
	@Transactional
	public Collection<BeneficiarioResponseDto> getBeneficiarios() {
		Collection<Beneficiario> beneficiarios = beneficiarioRepository.listAll();
		Collection<BeneficiarioResponseDto> dtos = new ArrayList<>();
		for (Beneficiario b : beneficiarios) {
			dtos.add(beneficiarioFactory.createResponseFromEntity(b));
		}
		if (dtos.isEmpty()) {
			throw new EmptyTableException("No hay registros de beneficiarios");
		}
		return dtos;
	}

	@Transactional
	public Collection<BeneficiarioResponseDto> persistBeneficiario(int dniSocio, List<BeneficiarioRequestDto> dtos) {
		Collection<BeneficiarioResponseDto> response = new ArrayList<>();	
		for (BeneficiarioRequestDto dto : dtos) {
			Beneficiario beneficiario = beneficiarioFactory.createEntityFromDto(dto);
			Socio socio = socioRepository.findByDni(dniSocio).get();
			if(socio.getEstaEliminado()==true) {
				throw new RuntimeException("El socio está eliminado");
			}else {
				Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository.findByDniyIdSocio(beneficiario.getDni(), socio.getId());
				if(optionalBeneficiario.isPresent()) {
					throw new RuntimeException("Este beneficiario ya está agregado al grupo familiar del socio");
				}
				beneficiario.setSocio(socio);
				this.beneficiarioRepository.persist(beneficiario);
				response.add(beneficiarioFactory.createResponseFromEntity(beneficiario));
			}
		}
		return response;
	}

	@Transactional
	public BeneficiarioResponseDto updateBeneficiario(int dniBeneficiario, Long idSocio, BeneficiarioRequestDto dto) {
		Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository.findByDniyIdSocio(dniBeneficiario, idSocio);
		if (optionalBeneficiario.isPresent()) {
			Beneficiario beneficiario = optionalBeneficiario.get();
				try {
					BeanUtils.copyProperties(beneficiario, dto);
					beneficiario.setId(optionalBeneficiario.get().getId());
				} catch (IllegalAccessException | InvocationTargetException e) {
	                throw new RuntimeException("Error al copiar propiedades", e);
				}
			return this.beneficiarioFactory.createResponseFromEntity(beneficiario);
		} else {
			throw new BeneficiarioNotFoundException("Beneficiario no encontrado");
		}
	}

	@Transactional
	public void deleteBeneficiario(Long idBeneficiario, Long idSocio) {
		int updatedRows = this.beneficiarioRepository.update("estaEliminado = true WHERE id = ?1 and socio.id = ?2", idBeneficiario, idSocio);
		if (updatedRows == 0) {
			throw new BeneficiarioNotFoundException("Beneficiario no encontrado");
		}
	}

}
