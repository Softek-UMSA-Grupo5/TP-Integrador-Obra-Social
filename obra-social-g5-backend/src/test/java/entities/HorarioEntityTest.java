package entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.repositories.HorarioRepository;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@QuarkusTest
public class HorarioEntityTest {
	@Inject
	HorarioRepository horarioRepository;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	@Transactional
	public void testHorarioEntity() {
		// Arrange
		Horario horario = new Horario();
		horario.setDiaSemana(Horario.DiaSemana.LUNES);
		horario.setHoraInicio(LocalTime.of(9, 0));
		horario.setHoraFin(LocalTime.of(17, 0));
		horario.setEstaEliminado(false);

		// Act
		horarioRepository.persist(horario);

		// Assert
		assertNotNull(horario.getId());
		assertEquals(Horario.DiaSemana.LUNES, horario.getDiaSemana());
		assertEquals(LocalTime.of(9, 0), horario.getHoraInicio());
		assertEquals(LocalTime.of(17, 0), horario.getHoraFin());
		assertFalse(horario.isEstaEliminado());
	}
}
