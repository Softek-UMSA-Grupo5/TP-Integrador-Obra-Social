package org.softek.g5.repositories;

import java.util.List;
import java.util.Optional;

import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ConsultorioRepository implements PanacheRepository<Consultorio>{
	
	 public Consultorio findByUbicacion(String ciudad, String provincia, String calle, Integer altura) {
	        return find("FROM Consultorio c WHERE c.ubicacion.ciudad = ?1 AND c.ubicacion.provincia = ?2 AND c.ubicacion.calle = ?3 AND c.ubicacion.altura = ?4",
	                ciudad, provincia, calle, altura).firstResult();
	    }
	 public Consultorio findByUbicacion(Ubicacion ubicacion) {
	        return find("ubicacion", ubicacion).firstResult();
	    }
	 
	 //PRUEBA
	 public Consultorio findByUbicacion(UbicacionRequestDto ubicacionDto) {
	        return find("ubicacion", ubicacionDto).firstResult();
	    }
	 //
	 
	 public Optional<Consultorio> findByCodigo(String codigo) {
	        return find("codigo AND estaEliminado = 0", codigo).firstResultOptional();
	    }
	 public List<Consultorio> findByCodigo(Long id) {
			return find("consultorio.id = ?1 AND estaEliminado = 0", id).list();
		}
	 
	 public List<Consultorio> findByMedico(Long id) {
			return find("medico.id = ?1 AND estaEliminado = 0", id).list();
		}

}
