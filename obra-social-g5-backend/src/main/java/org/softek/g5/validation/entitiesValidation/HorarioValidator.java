package org.softek.g5.validation.entitiesValidation;

import java.time.LocalTime;
import java.util.List;

import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.validation.DataValidator;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HorarioValidator {

    public static boolean validateRequestDto(HorarioRequestDto dto) {
        return DataValidator.validateString(dto.getCodigo(), 3, 20)
                && dto.getHoraInicio() != null
                && dto.getHoraFin() != null
                && dto.getDiaSemana() != null;
    }

    public static boolean validateHorarios(List<HorarioRequestDto> horarios) {
        if (horarios.isEmpty() || horarios.size() == 1) {
            return true; 
        }

        for (int i = 0; i < horarios.size() - 1; i++) {
            for (int j = i + 1; j < horarios.size(); j++) {
                if (horarios.get(i).getDiaSemana().equals(horarios.get(j).getDiaSemana())) {
                    if (horariosSeSuperponen(horarios.get(i), horarios.get(j))) {
                        return false; 
                    }
                }
            }
        }

        return true; 
    }

    private static boolean horariosSeSuperponen(HorarioRequestDto horario1, HorarioRequestDto horario2) {
        LocalTime inicio1 = horario1.getHoraInicio();
        LocalTime fin1 = horario1.getHoraFin();
        LocalTime inicio2 = horario2.getHoraInicio();
        LocalTime fin2 = horario2.getHoraFin();

        return (inicio1.isBefore(fin2) && inicio2.isBefore(fin1))
                || (inicio1.equals(inicio2) && fin1.equals(fin2)) 
                || (inicio1.isAfter(inicio2) && fin1.isBefore(fin2)); 
    }
}

