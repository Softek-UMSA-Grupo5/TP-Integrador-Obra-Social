package entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.repositories.UbicacionRepository;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@QuarkusTest
public class UbicacionEntityTest {
	@Inject
	UbicacionRepository ubicacionRepository;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@Transactional
	public void testUbicacionEntity() {
		// Arrange
		Ubicacion ubicacion = new Ubicacion();
		ubicacion.setCiudad("Ciudad Test");
		ubicacion.setProvincia("Provincia Test");
		ubicacion.setDireccion("Direccion Test");
		ubicacion.setAltura(123);
		ubicacion.setEstaEliminado(false);

		// Act
		ubicacionRepository.persist(ubicacion);

		// Assert
		assertNotNull(ubicacion.getId());
		assertEquals("Ciudad Test", ubicacion.getCiudad());
		assertEquals("Provincia Test", ubicacion.getProvincia());
		assertEquals("Direccion Test", ubicacion.getDireccion());
		assertEquals(123, ubicacion.getAltura());
		assertFalse(ubicacion.isEstaEliminado());
	}

}
