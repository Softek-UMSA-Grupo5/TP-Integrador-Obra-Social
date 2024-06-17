package ubicacionTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.repositories.UbicacionRepository;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@QuarkusTest
@ExtendWith(MockitoExtension.class)
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
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCiudad("Ciudad Test");
        ubicacion.setProvincia("Provincia Test");
        ubicacion.setCalle("Calle Test");
        ubicacion.setAltura(123);
        ubicacion.setEstaEliminado(false);

        ubicacionRepository.persist(ubicacion);

        assertNotNull(ubicacion.getId());
        assertEquals("Ciudad Test", ubicacion.getCiudad());
        assertEquals("Provincia Test", ubicacion.getProvincia());
        assertEquals(123, ubicacion.getAltura());
        assertFalse(ubicacion.isEstaEliminado());

        Ubicacion ubicacionRecuperada = Ubicacion.findById(ubicacion.getId());
        assertNotNull(ubicacionRecuperada);
        assertEquals(ubicacion, ubicacionRecuperada);

        assertNotNull(ubicacion.getCodigo());
        assertEquals(10, ubicacion.getCodigo().length());
    }

    @Test
    @Transactional
    public void testCamposRequeridos() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCiudad("Ciudad Test");
        ubicacion.setProvincia("Provincia Test");
        ubicacion.setCalle("Calle Test");
        ubicacion.setAltura(123);
        ubicacion.setEstaEliminado(false);

        ubicacionRepository.persist(ubicacion);

        assertNotNull(ubicacion.getId());
        assertEquals("Ciudad Test", ubicacion.getCiudad());
        assertEquals("Provincia Test", ubicacion.getProvincia());
        assertEquals(123, ubicacion.getAltura());
        assertFalse(ubicacion.isEstaEliminado());
    }


    @Test
    @Transactional
    public void testGeneracionCodigoUnico() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCiudad("Ciudad Test");
        ubicacion.setProvincia("Provincia Test");
        ubicacion.setCalle("Calle Test");
        ubicacion.setAltura(123);
        ubicacion.setEstaEliminado(false);

        ubicacionRepository.persist(ubicacion);

        assertNotNull(ubicacion.getCodigo());
        assertEquals(10, ubicacion.getCodigo().length());
    }

}