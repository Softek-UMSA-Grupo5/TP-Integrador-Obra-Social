package medicamentoTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.medicamento.dto.MedicamentoResponseDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.services.MedicamentoService;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class ServiceTest {

	@InjectMocks
    MedicamentoService medicamentoService;

	@Mock
    RecetaMedicaRepository recetaMedicaRepository;

    @Mock
    MedicamentoRepository medicamentoRepository;

    @Mock
    MedicamentoFactory medicamentoFactory;

    MedicamentoRequestDto medicamentoRequestDto;
    MedicamentoResponseDto medicamentoResponseDto;
    List<MedicamentoResponseDto> listMedicamentoResponseDto;
    Medicamento medicamento;
    RecetaMedica recetaMedica;
    List<Medicamento> medicamentos;
    List<MedicamentoRequestDto> listMedicamentoRequestDto = new ArrayList<>();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(medicamentoService);
        assertNotNull(medicamentoRepository);
        assertNotNull(recetaMedicaRepository);
        assertNotNull(medicamentoFactory);
    }

    @Test
    public void getAllMedicamentosTest() throws Exception {
    	medicamentos = List.of(new Medicamento(1L, "Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, null),
        		new Medicamento(2L, "Curaplus-600mg-pildora", "Curaplus", "600mg", "pildora", "cada 5 horas",
                        "por 12 días", "tomar luego de cada comida", false, null)); 
    	   	
        when(medicamentoRepository.listAll()).thenReturn(medicamentos);

        List<MedicamentoResponseDto> result = medicamentoService.getMedicamentos();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(medicamentoRepository).listAll();
    }
    
    @Test
    public void getMedicamentoByIdTest() throws Exception {
    	medicamento = new Medicamento(1L, "Actron-600mg-pildora", "Actron", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, null);
    	
    	medicamentoResponseDto = new MedicamentoResponseDto("Actron-600mg-pildora", "Actron", "600mg", "pildora",
                "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, null);
    	
        when(medicamentoRepository.findById(1L)).thenReturn(medicamento);
        when(medicamentoFactory.createResponseFromEntity(medicamento)).thenReturn(medicamentoResponseDto);

        MedicamentoResponseDto response = medicamentoService.getMedicamentosById(1L);

        assertNotNull(response);
        assertEquals("Actron-600mg-pildora", response.getCodigo());
        verify(medicamentoRepository, times(1)).findById(1L);
        verify(medicamentoFactory, times(1)).createResponseFromEntity(medicamento);
    }
    
    @Test
    public void getMedicamentosByCodigoTest() throws Exception {
    	medicamentos = List.of(new Medicamento(1L, "Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, null));
    	
    	medicamentoResponseDto = new MedicamentoResponseDto("Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora",
                "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, null);
    	
        when(medicamentoRepository.findByCodigo("Ibuprofeno-600mg-pildora")).thenReturn(medicamentos);
        when(medicamentoFactory.createResponseFromEntity(medicamentos.get(0))).thenReturn(medicamentoResponseDto);

        List<MedicamentoResponseDto> response = medicamentoService.getMedicamentosByCodigo("Ibuprofeno-600mg-pildora");

        assertNotNull(response);
        assertEquals("Ibuprofeno-600mg-pildora", response.get(0).getCodigo());
        verify(medicamentoRepository, times(1)).findByCodigo("Ibuprofeno-600mg-pildora");
        verify(medicamentoFactory, times(1)).createResponseFromEntity(medicamentos.get(0));
    }
    
    @Test
    public void getMedicamentosByRecetaTest() throws Exception {
    	
    	recetaMedica = new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null);
    	
    	medicamentos = List.of(new Medicamento(1L, "Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, recetaMedica));
    	
    	medicamentoResponseDto = new MedicamentoResponseDto("Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora",
                "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, 1L);
    	
        when(medicamentoRepository.findByReceta(1L)).thenReturn(medicamentos);
        when(medicamentoFactory.createResponseFromEntity(medicamentos.get(0))).thenReturn(medicamentoResponseDto);

        List<MedicamentoResponseDto> response = medicamentoService.getMedicamentosByReceta(1L);

        assertNotNull(response);
        assertEquals("Ibuprofeno-600mg-pildora", response.get(0).getCodigo());
        verify(medicamentoRepository, times(1)).findByReceta(1L);
        verify(medicamentoFactory, times(1)).createResponseFromEntity(medicamentos.get(0));
    }

    //Error: detached entity passed to persist
    /*@Test
    @Transactional
    void testPersistMedicamento_Success(){
    	
    	listMedicamentoRequestDto = List.of(new MedicamentoRequestDto("Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida"));
    	
    	recetaMedica = new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null);
    	
    	medicamentos = List.of(new Medicamento(1L, "Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, null));
    	
    	medicamentoResponseDto = new MedicamentoResponseDto("Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora",
                "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, 1L);
    	
    	when(medicamentoFactory.createEntityFromDto(listMedicamentoRequestDto.get(0))).thenReturn(medicamentos.get(0));
    	
        when(recetaMedicaRepository.findByCodigo("receta-1")).thenReturn(Optional.of(recetaMedica));
        when(medicamentoRepository.findByCodigoyReceta(medicamentos.get(0).getCodigo(), 1L)).thenReturn(Optional.empty());
        when(medicamentoFactory.createResponseFromEntity(medicamentos.get(0))).thenReturn(medicamentoResponseDto);

        List<MedicamentoResponseDto> response = medicamentoService.persistMedicamento("receta-1", listMedicamentoRequestDto);

        assertNotNull(response);
        assertEquals(1, response.size());
        verify(medicamentoRepository, times(1)).persist(any(Medicamento.class));
    }*/
    
    @Test
    public void testUpdateMedicamento_Success(){
    	
    	listMedicamentoRequestDto = List.of(new MedicamentoRequestDto("Actron", "200mg", "tableta", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida"));
    	
    	recetaMedica = new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null);
    	
    	medicamento = new Medicamento(1L, "Ibuprofeno-600mg-pildora", "Ibuprofeno", "600mg", "pildora", "cada 5 horas",
                "por 12 días", "tomar luego de cada comida", false, recetaMedica);
    	
    	medicamentoResponseDto = new MedicamentoResponseDto("Actron-200mg-tableta", "Actron", "200mg", "tableta",
                "cada 5 horas", "por 12 días", "tomar luego de cada comida", false, 1L);
    	
    	when(medicamentoRepository.findByCodigoyReceta("Ibuprofeno-600mg-pildora", 1L)).thenReturn(Optional.of(medicamento));
    	when(medicamentoFactory.createResponseFromEntity(medicamento)).thenReturn(medicamentoResponseDto);
    	
    	MedicamentoResponseDto response = medicamentoService.updateMedicamento("Ibuprofeno-600mg-pildora", 1L, listMedicamentoRequestDto.get(0));
    	
    	assertNotNull(response);
        assertEquals("Actron-200mg-tableta", response.getCodigo());
        verify(medicamentoRepository, times(1)).findByCodigoyReceta("Ibuprofeno-600mg-pildora", 1L);
        verify(medicamentoFactory, times(1)).createResponseFromEntity(medicamento);
    }
    
    
    @Test
    public void testDeleteMedicamento_Success(){
    	
        when(medicamentoRepository.update(
                "estaEliminado = true WHERE codigo = ?1 and recetaMedica.id = ?2", "Ibuprofeno-600mg-pildora", 1L))
                .thenReturn(1); 

        medicamentoService.deleteMedicamento("Ibuprofeno-600mg-pildora", 1L);

        verify(medicamentoRepository, times(1))
                .update("estaEliminado = true WHERE codigo = ?1 and recetaMedica.id = ?2", "Ibuprofeno-600mg-pildora", 1L);
    	
    }
}
