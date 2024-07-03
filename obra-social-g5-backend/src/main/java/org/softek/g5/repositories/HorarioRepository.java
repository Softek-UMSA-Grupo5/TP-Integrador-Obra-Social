package org.softek.g5.repositories;

import java.time.LocalTime;

import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.HorarioDiaSemanaEnum;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HorarioRepository implements PanacheRepository<Horario> {
	public Horario findByCodigo(String codigo) {
		return find("codigo", codigo).firstResult();
	}

	public Horario findByDetails(HorarioDiaSemanaEnum diaSemana, LocalTime horaInicio, LocalTime horaFin,
			Long idConsultorio) {
		return find("diaSemana = ?1 AND horaFin = ?2 AND horaInicio = ?3 AND consultorio.id = ?4", diaSemana,
				horaInicio, horaFin, idConsultorio).firstResult();
	}

	public Horario findByDetailsANDConsultorioNull(HorarioDiaSemanaEnum diaSemana, LocalTime horaInicio,
			LocalTime horaFin) {
		return find("diaSemana = ?1 AND horaInicio = ?2 AND horaFin = ?3 AND consultorio.id IS NULL", diaSemana,
				horaInicio, horaFin).firstResult();
	}

}
