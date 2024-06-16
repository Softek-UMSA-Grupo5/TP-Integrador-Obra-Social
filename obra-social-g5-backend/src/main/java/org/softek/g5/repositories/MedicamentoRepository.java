package org.softek.g5.repositories;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.medicamento.Medicamento;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class MedicamentoRepository implements PanacheRepositoryBase<Medicamento, Long>{

	public Medicamento findById(Long id) {
		return find("id = ?1 and estaEliminado = false", id).firstResult();
	}
	
	public Optional<Medicamento> findByName(String name) {
		return find("nombre = ?1 and estaEliminado = false", name).firstResultOptional();
	}
	
	public List<Medicamento> findByCodigo(String codigo) {
		return find("codigo = ?1 and estaEliminado = false", codigo).list();
	} 
	
	public Optional<Medicamento> findByCodigoyReceta(String codigo, Long idReceta) {
		return find("codigo = ?1 and recetaMedica.id = ?2 and estaEliminado = false", codigo, idReceta).firstResultOptional();
	}
	
	public List<Medicamento> findByReceta(Long id) {
		return find("recetaMedica.id = ?1 and estaEliminado = false", id).list();
	} 
	
}
