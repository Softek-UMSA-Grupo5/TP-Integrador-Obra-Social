package org.softek.g5.repositories;


import org.softek.g5.entities.ubicacion.Ubicacion;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UbicacionRepository implements PanacheRepository<Ubicacion>{
	 public Ubicacion searchByDetails(String ciudad, String provincia, String calle, int altura) {
	        return find("ciudad = ?1 and provincia = ?2 and calle = ?3 and altura = ?4 and estaEliminado = false",
	                    ciudad, provincia, calle, altura).firstResult();
	    }

	 public Ubicacion findByCodigo(String codigo) {
	        return find("codigo", codigo).firstResult();
	    }
}
