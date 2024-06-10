package entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.repositories.UbicacionRepository;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

@QuarkusTest
public class HorarioEntityTest {
    @Inject
    HorarioRepository horarioRepository;

    @Inject
    ConsultorioRepository consultorioRepository;
    
    @Inject
    UbicacionRepository ubicacionRepository;

    @PersistenceContext
    EntityManager em;
    
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Transactional
    public void testHorarioEntity() {
        Horario horario = new Horario();
        horario.setDiaSemana(Horario.DiaSemana.LUNES);
        horario.setHoraInicio(LocalTime.of(9, 0));
        horario.setHoraFin(LocalTime.of(17, 0));
        horario.setEstaEliminado(false);

        horarioRepository.persist(horario);

        assertNotNull(horario.getId());
        assertEquals(Horario.DiaSemana.LUNES, horario.getDiaSemana());
        assertEquals(LocalTime.of(9, 0), horario.getHoraInicio());
        assertEquals(LocalTime.of(17, 0), horario.getHoraFin());
        assertFalse(horario.isEstaEliminado());
    }

    @Test
    public void testCamposRequeridos() {
        Horario horario = new Horario();

        assertThrows(PersistenceException.class, () -> {
            horario.persist();
        });
    }

    @Test
    @Transactional
    public void testGeneracionCodigoUnico() {
        Horario horario = new Horario();
        horario.setDiaSemana(Horario.DiaSemana.LUNES);
        horario.setHoraInicio(LocalTime.of(9, 0));
        horario.setHoraFin(LocalTime.of(17, 0));
        horario.setEstaEliminado(false);

        horarioRepository.persist(horario);

        assertNotNull(horario.getCodigo());
        assertEquals(5, horario.getCodigo().length());
    }

    @Test
    @Transactional
    public void testRelacionConConsultorio() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCiudad("Ciudad Test");
        ubicacion.setProvincia("Provincia Test");
        ubicacion.setCalle("Calle Test");
        ubicacion.setAltura(123);
        ubicacion.setEstaEliminado(false);
        ubicacionRepository.persist(ubicacion);

        Consultorio consultorio = new Consultorio();
        consultorio.setUbicacion(ubicacion);
        consultorio.setEstaEliminado(false);
        consultorioRepository.persist(consultorio);

        Horario horario = new Horario();
        horario.setDiaSemana(Horario.DiaSemana.LUNES);
        horario.setHoraInicio(LocalTime.of(9, 0));
        horario.setHoraFin(LocalTime.of(17, 0));
        horario.setConsultorio(consultorio);
        horario.setEstaEliminado(false);

        horarioRepository.persist(horario);

        assertNotNull(horario.getId());
        assertEquals(Horario.DiaSemana.LUNES, horario.getDiaSemana());
        assertEquals(LocalTime.of(9, 0), horario.getHoraInicio());
        assertEquals(LocalTime.of(17, 0), horario.getHoraFin());
        assertFalse(horario.isEstaEliminado());
    }
}
