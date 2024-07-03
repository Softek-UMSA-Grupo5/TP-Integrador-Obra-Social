package org.softek.g5.repositories;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.beneficiario.Beneficiario;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BeneficiarioRepository implements PanacheRepositoryBase<Beneficiario, Long>{
	
	public List<Beneficiario> findBySocio(Long id) {
		return find("socio.id = ?1 ", id).list();
	}
	
	public Optional<Beneficiario> findByDniyIdSocio(int dniBeneficiario, Long idSocio) {
		return find("dni = ?1 and socio.id = ?2", dniBeneficiario, idSocio).firstResultOptional();
	}
	
	public Optional<Beneficiario> findByIdBeneficiarioAndIdSocio(Long idBeneficiario, Long idSocio) {
		return find("id = ?1 and socio.id = ?2", idBeneficiario, idSocio).firstResultOptional();
	}
	
}
