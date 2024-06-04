package org.softek.g5.repositories;

import org.softek.g5.entities.horario.Horario;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HorarioRepository implements PanacheRepository<Horario>{

}
