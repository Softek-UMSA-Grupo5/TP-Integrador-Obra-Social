package org.softek.g5.repositories;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medicamento.Medicamento;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicamentoRepository implements PanacheRepositoryBase<Medicamento, Long>{

	public Optional<Medicamento> findByName(String name) {
		return find("nombre", name).firstResultOptional();
	}
	
	public Optional<Medicamento> findByCodigo(String codigo) {
		return find("codigo", codigo).firstResultOptional();
	} 
	
	public Optional<Medicamento> findByCodigoyReceta(String codigo, Long idReceta) {
		System.out.println(codigo + "  " + idReceta);
		return find("codigo = ?1 and recetaMedica.id = ?2", codigo, idReceta).firstResultOptional();
	}
	
	public List<Medicamento> findByReceta(Long id) {
		return find("recetaMedica.id = ?1 ", id).list();
	} 
	
}
