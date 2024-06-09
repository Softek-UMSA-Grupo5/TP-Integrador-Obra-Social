package medicamentoTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.services.MedicamentoService;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@QuarkusTest
public class ServiceTest {
	
	@Inject
	@InjectMocks
    MedicamentoService medicamentoService;
	@Inject
	@InjectMock
    MedicamentoRepository medicamentoRepository;
	@Inject
	@InjectMock
    RecetaMedicaRepository recetaMedicaRepository;
	
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(medicamentoService);
        assertNotNull(medicamentoRepository);
        assertNotNull(recetaMedicaRepository);
    }

    @Test
    public void getAllMedicamentosTest() throws Exception {
        List<Medicamento> medicamentos = List.of(
                new Medicamento(1L, "Ibuprofeno-300mg-tableta", "Ibuprofeno", "300mg", "tableta", "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, new RecetaMedica()),
                new Medicamento(2L, "Curaplus-300mg-tableta", "Curaplus", "300mg", "tableta", "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, new RecetaMedica()));
        when(medicamentoRepository.listAll()).thenReturn(medicamentos);

        List<MedicamentoResponseDto> result = medicamentoService.getMedicamentos();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(medicamentoRepository).listAll();
    }

}
