package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.medicamento.Medicamento;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicamentoRepository implements PanacheRepositoryBase<Medicamento, Long>{

	public Optional<Medicamento> findByName(String name) {
		return find("medicacion", name).firstResultOptional();
	}
	
}
