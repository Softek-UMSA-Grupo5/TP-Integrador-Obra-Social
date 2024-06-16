package turnoMedicoTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.turnoMedico.TurnoMedico;
import org.softek.g5.entities.turnoMedico.TurnoMedicoEstadoEnum;
import org.softek.g5.entities.turnoMedico.TurnoMedicoFactory;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoRequestDto;
import org.softek.g5.entities.turnoMedico.dto.TurnoMedicoResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.SocioRepository;
import org.softek.g5.repositories.TurnoMedicoRepository;
import org.softek.g5.services.RecetaMedicaService;
import org.softek.g5.services.TurnoMedicoService;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
class ServiceTest {

	@InjectMocks
	TurnoMedicoService turnoMedicoService;
	
	@Mock
	TurnoMedicoRepository turnoMedicoRepository;

	@Mock
	TurnoMedicoFactory turnoMedicoFactory;

	@Mock
	RecetaMedicaService recetaMedicaService;

	@Mock
	SocioRepository socioRepository;

	@Mock
	MedicoRepository medicoRepository;

	List<TurnoMedico> listTurnoMedico;
    List<TurnoMedicoResponseDto> listTurnoMedicoResponseDto;
    List<TurnoMedicoRequestDto> listTurnoMedicoRequestDto;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(turnoMedicoService);
        assertNotNull(turnoMedicoRepository);
        assertNotNull(turnoMedicoFactory);
        assertNotNull(recetaMedicaService);
        assertNotNull(socioRepository);
        assertNotNull(medicoRepository);
    }
    
    @Test
    public void getTurnoMedicoTest() throws CustomServerException {
    	listTurnoMedico = List.of(new TurnoMedico(1L, "turno-1", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
    			, "Dolor de panza", false, null, null, null),
        		new TurnoMedico(2L, "turno-2", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
            			, "Dolor de cabeza", false, null, null, null));
    	   	
        when(turnoMedicoRepository.listAll()).thenReturn(listTurnoMedico);

        List<TurnoMedicoResponseDto> response = turnoMedicoService.getTurnoMedico();

        assertNotNull(response);
        assertEquals(2, response.size());
        verify(turnoMedicoRepository, times(1)).listAll();
    }
    
    @Test
    public void getTurnoMedicoByCodigoTest() throws CustomServerException {
    	listTurnoMedico = List.of(new TurnoMedico(1L, "turno-1", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
    			, "Dolor de panza", false, null, null, null),
        		new TurnoMedico(2L, "turno-2", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
            			, "Dolor de cabeza", false, null, null, null)); 
    	
    	listTurnoMedicoResponseDto = List.of(new TurnoMedicoResponseDto("turno-1", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
    			, "Dolor de panza", null, false, null, null));
    	   	
        when(turnoMedicoRepository.findByCodigo("turno-1")).thenReturn(Optional.of(listTurnoMedico.get(0)));
        when(turnoMedicoFactory.createResponseFromEntity(listTurnoMedico.get(0))).thenReturn(listTurnoMedicoResponseDto.get(0));

        TurnoMedicoResponseDto response = turnoMedicoService.getTurnoMedicoByCodigo("turno-1");

        assertNotNull(response);
        assertEquals("turno-1", response.getCodigo());
        verify(turnoMedicoRepository, times(1)).findByCodigo("turno-1");
        verify(turnoMedicoFactory, times(1)).createResponseFromEntity(listTurnoMedico.get(0));
    }
    
    // Hay que terminar el test
    /*@Test
    public void getTurnoMedicoBySocioTest() throws CustomServerException {
    	Socio socio = new Socio(1L, "Luciano", "Malleret", "3456545581", "lucianomalleret8@gmail.com", 41907546
    			, "23419075469", );
    	
    	listTurnoMedico = List.of(new TurnoMedico(1L, "turno-1", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
    			, "Dolor de panza", false, null, null, socio),
        		new TurnoMedico(2L, "turno-2", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
            			, "Dolor de cabeza", false, null, null, null)); 
    	
    	listTurnoMedicoResponseDto = List.of(new TurnoMedicoResponseDto("turno-1", LocalDate.now(), 17, 30, TurnoMedicoEstadoEnum.PENDIENTE
    			, "Dolor de panza", null, false, null, null));
    	   	
        when(turnoMedicoRepository.findByCodigo("turno-1")).thenReturn(Optional.of(listTurnoMedico.get(0)));
        when(turnoMedicoFactory.createResponseFromEntity(listTurnoMedico.get(0))).thenReturn(listTurnoMedicoResponseDto.get(0));

        TurnoMedicoResponseDto response = turnoMedicoService.getTurnoMedicoByCodigo("turno-1");

        assertNotNull(response);
        assertEquals("turno-1", response.getCodigo());
        verify(turnoMedicoRepository, times(1)).findByCodigo("turno-1");
        verify(turnoMedicoFactory, times(1)).createResponseFromEntity(listTurnoMedico.get(0));
    }*/
	
}
