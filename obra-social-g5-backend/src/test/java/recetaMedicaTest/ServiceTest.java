package recetaMedicaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.entities.recetaMedica.RecetaMedicaFactory;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.repositories.MedicamentoRepository;
import org.softek.g5.repositories.RecetaMedicaRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;
import org.softek.g5.services.MedicamentoService;
import org.softek.g5.services.RecetaMedicaService;

import java.util.Optional;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
class ServiceTest {

	@InjectMocks
	RecetaMedicaService recetaMedicaService;
	
	@Mock
	RecetaMedicaRepository recetaMedicaRepository;
	
	@Mock
	RecetaMedicaFactory recetaMedicaFactory;

	@Mock
	MedicamentoService medicamentoService;

	@Mock
	MedicamentoFactory medicamentoFactory;
	
	@Mock
	MedicamentoRepository medicamentoRepository;

	@Mock
	TurnoMedicoRepository turnoMedicoRepository;
	
    List<RecetaMedica> listRecetaMedica;
    List<RecetaMedicaResponseDto> listRecetaMedicaResponseDto;
    List<RecetaMedicaRequestDto> listRecetaMedicaRequestDto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(recetaMedicaService);
        assertNotNull(recetaMedicaFactory);
        assertNotNull(medicamentoService);
        assertNotNull(medicamentoFactory);
        assertNotNull(medicamentoRepository);
        assertNotNull(turnoMedicoRepository);
    }
    
    @Test
    public void getAllMedicamentosTest() throws CustomServerException {
    	listRecetaMedica = List.of(new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null),
        		new RecetaMedica(2L, "receta-2", LocalDate.now(), LocalDate.now(), 30, false, null,
                        null)); 
    	   	
        when(recetaMedicaRepository.listAll()).thenReturn(listRecetaMedica);

        List<RecetaMedicaResponseDto> result = recetaMedicaService.getRecetaMedica();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(recetaMedicaRepository).listAll();
    }
    
    @Test
    public void getRecetaMedicaByIdTest() throws CustomServerException {
    	listRecetaMedica = List.of(new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null),
        		new RecetaMedica(2L, "receta-2", LocalDate.now(), LocalDate.now(), 30, false, null,
                        null)); 
    	
    	listRecetaMedicaResponseDto = List.of(new RecetaMedicaResponseDto("receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null));
    	   	
        when(recetaMedicaRepository.findByIdOptional(1L)).thenReturn(Optional.of(listRecetaMedica.get(0)));
        when(recetaMedicaFactory.createResponseFromEntity(listRecetaMedica.get(0))).thenReturn(listRecetaMedicaResponseDto.get(0));

        RecetaMedicaResponseDto response = recetaMedicaService.getRecetaMedicaById(1L);

        assertNotNull(response);
        assertEquals("receta-1", response.getCodigo());
        verify(recetaMedicaRepository, times(1)).findByIdOptional(1L);
        verify(recetaMedicaFactory, times(1)).createResponseFromEntity(listRecetaMedica.get(0));
    }
    
    @Test
    public void getRecetaMedicaByCodigoTest() throws CustomServerException {
    	listRecetaMedica = List.of(new RecetaMedica(1L, "receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null),
        		new RecetaMedica(2L, "receta-2", LocalDate.now(), LocalDate.now(), 30, false, null,
                        null)); 
    	
    	listRecetaMedicaResponseDto = List.of(new RecetaMedicaResponseDto("receta-1", LocalDate.now(), LocalDate.now(), 30, false, null,
                null));
    	   	
        when(recetaMedicaRepository.findByCodigo("receta-1")).thenReturn(Optional.of(listRecetaMedica.get(0)));
        when(recetaMedicaFactory.createResponseFromEntity(listRecetaMedica.get(0))).thenReturn(listRecetaMedicaResponseDto.get(0));

        RecetaMedicaResponseDto response = recetaMedicaService.getRecetaMedicaByCodigo("receta-1");

        assertNotNull(response);
        assertEquals("receta-1", response.getCodigo());
        verify(recetaMedicaRepository, times(1)).findByCodigo("receta-1");
        verify(recetaMedicaFactory, times(1)).createResponseFromEntity(listRecetaMedica.get(0));
    }
    
    @Test
    public void getRecetaMedicaBetweenDatesTest() throws CustomServerException {
    	listRecetaMedica = List.of(new RecetaMedica(1L, "receta-1", LocalDate.parse("2006-05-17"), LocalDate.parse("2006-05-17"), 30, false, null,
                null),
        		new RecetaMedica(2L, "receta-2", LocalDate.parse("2009-03-21"), LocalDate.parse("2009-03-21"), 30, false, null,
                        null)); 
    	
    	listRecetaMedicaResponseDto = List.of(new RecetaMedicaResponseDto("receta-1", LocalDate.parse("2006-05-17"), LocalDate.parse("2006-05-17"), 30, false, null,
                null));
    	   	
        when(recetaMedicaRepository.findBetweenDates(LocalDate.parse("2005-01-01"), LocalDate.parse("2006-12-31"))).thenReturn(List.of(listRecetaMedica.get(0)));
        when(recetaMedicaFactory.createResponseFromEntity(listRecetaMedica.get(0))).thenReturn(listRecetaMedicaResponseDto.get(0));

        List<RecetaMedicaResponseDto> response = recetaMedicaService.getRecetaMedicaBetweenDates("2005-01-01", "2006-12-31");

        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals("receta-1", response.get(0).getCodigo());
        verify(recetaMedicaRepository, times(1)).findBetweenDates(LocalDate.parse("2005-01-01"), LocalDate.parse("2006-12-31"));
        verify(recetaMedicaFactory, times(1)).createResponseFromEntity(listRecetaMedica.get(0));
    }
    

}
