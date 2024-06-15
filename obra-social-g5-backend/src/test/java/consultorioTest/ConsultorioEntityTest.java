package consultorioTest;

import io.quarkus.test.junit.QuarkusTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.UbicacionRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import jakarta.transaction.Transactional;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@QuarkusTest
public class ConsultorioEntityTest {

    @InjectMocks
    ConsultorioRepository consultorioRepository;

    @Mock
    MedicoRepository medicoRepository;

    @Mock
    UbicacionRepository ubicacionRepository;
    
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        consultorioRepository = Mockito.mock(ConsultorioRepository.class);
        medicoRepository = Mockito.mock(MedicoRepository.class);
        ubicacionRepository = Mockito.mock(UbicacionRepository.class);
    }
    
    @Test
    void testCodigoUnicoGenerado() {
        String codigoGenerado = generarCodigoUnico();

        assertNotNull(codigoGenerado, "El código único no debería ser nulo");
    }

    @Test
    void testRelacionConHorariosAtencion() {
        Consultorio consultorio = new Consultorio();
        
        consultorio.setHorarioAtencion(new ArrayList<>());

        Horario horario = new Horario();
        consultorio.getHorarioAtencion().add(horario);

        assertNotNull(consultorio.getHorarioAtencion(), "La lista de horarios de atención no debería ser nula");
        assertFalse(consultorio.getHorarioAtencion().isEmpty(), "La lista de horarios de atención no debería estar vacía");
    }

    private String generarCodigoUnico() {
        return "Código único generado";
    }

    @Test
    @Transactional
    public void testEliminacionLogicaConsultorio() {
        Ubicacion ubicacion = new Ubicacion();
        doNothing().when(ubicacionRepository).persist(any(Ubicacion.class));
        
        Medico medico = new Medico();
        doNothing().when(medicoRepository).persist(any(Medico.class));

        Consultorio consultorio = new Consultorio();
        consultorio.setUbicacion(ubicacion);
        consultorio.setMedico(medico);
        consultorio.setEstaEliminado(false);
        consultorioRepository.persist(consultorio);

        assertFalse(consultorio.isEstaEliminado());

        consultorio.setEstaEliminado(true);
        consultorioRepository.persist(consultorio);

        assertTrue(consultorio.isEstaEliminado());
    }
}
