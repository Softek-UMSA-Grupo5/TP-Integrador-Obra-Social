package org.softek.g5.repositories;

import java.util.Optional;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.ubicacion.Ubicacion;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ConsultorioRepository implements PanacheRepository<Consultorio>{
	 public Consultorio findByUbicacion(String ciudad, String provincia, String direccion, Integer altura) {
	        return find("FROM Consultorio c WHERE c.ubicacion.ciudad = ?1 AND c.ubicacion.provincia = ?2 AND c.ubicacion.direccion = ?3 AND c.ubicacion.altura = ?4",
	                ciudad, provincia, direccion, altura).firstResult();
	    }
	 public Consultorio findByUbicacion(Ubicacion ubicacion) {
	        return find("ubicacion", ubicacion).firstResult();
	    }
	 public Optional<Consultorio> findByCodigo(String codigo) {
	        return find("codigo", codigo).firstResultOptional();
	    }
}
