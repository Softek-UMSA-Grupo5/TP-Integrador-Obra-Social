package services;


import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

import org.hibernate.service.spi.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.consultorio.ConsultorioFactory;
import org.softek.g5.entities.consultorio.dto.ConsultorioRequestDto;
import org.softek.g5.entities.consultorio.dto.ConsultorioResponseDto;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.medico.Medico;
import org.softek.g5.entities.medico.MedicoFactory;
import org.softek.g5.entities.medico.dto.MedicoRequestDto;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.exceptions.entitiesCustomException.consultorio.ConsultorioNotFoundException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.repositories.MedicoRepository;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.services.ConsultorioService;
import org.softek.g5.services.HorarioService;
import org.softek.g5.services.MedicoService;
import org.softek.g5.services.UbicacionService;
import org.softek.g5.validation.entitiesValidation.HorarioValidator;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import java.sql.Date;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@QuarkusTest
@ExtendWith(MockitoExtension.class)
public class ConsultorioServiceTest {

	@InjectMocks
	ConsultorioService consultorioService;
    @Mock
    private ConsultorioRepository consultorioRepository;
    @Mock
    private UbicacionRepository ubicacionRepository;
    @Mock
    private UbicacionService ubicacionService;
    @Mock
    private HorarioRepository horarioRepository;
    @Mock
    private HorarioService horarioService;
    @Mock
    private MedicoService medicoService;
    @Mock
    private MedicoFactory medicoFactory;
    @Mock
    private MedicoRepository medicoRepository;
    @Mock
    private HorarioValidator horarioValidator;
    @Mock
    private ConsultorioFactory consultorioFactory;
	@BeforeEach
	void setUp() {
	    MockitoAnnotations.initMocks(this);
	    
	    consultorioService = new ConsultorioService(
	            consultorioRepository,
	            ubicacionRepository,
	            ubicacionService,
	            horarioRepository,
	            horarioService,
	            medicoService,
	            medicoFactory,
	            medicoRepository,
	            horarioValidator,
	            consultorioFactory
	        );
	}


	@Test
	void GetAllConsultoriosTest() {
		Consultorio consultorio1 = new Consultorio();
		Consultorio consultorio2 = new Consultorio();
		when(consultorioRepository.listAll()).thenReturn(List.of(consultorio1, consultorio2));

		List<ConsultorioResponseDto> consultorios = consultorioService.getAllConsultorios();

		verify(consultorioRepository, times(1)).listAll();
	}
	
	@Test
    void GetConsultorioByCodigoTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(false);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        ConsultorioResponseDto result = consultorioService.getConsultorioByCodigo(codigo);

        assertNotNull(result);
        assertEquals(codigo, result.getCodigo());
    }
	@Test
	void GetConsultorioByCodigoNotFoundTest() {
	    String codigo = "testCodigo";

	    when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.empty());

	    ServiceException thrown = assertThrows(ServiceException.class, () -> {
	        consultorioService.getConsultorioByCodigo(codigo);
	    });

	    assertTrue(thrown.getCause() instanceof ConsultorioNotFoundException);
	    assertEquals("Consultorio no encontrado con código: " + codigo, thrown.getCause().getMessage());
	}


    @Test
    void GetConsultorioByCodigoEliminadoTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(true);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        ServiceException thrown = assertThrows(ServiceException.class, () -> {
            consultorioService.getConsultorioByCodigo(codigo);
        });

        assertTrue(thrown.getCause() instanceof ConsultorioNotFoundException);
        assertEquals("Consultorio eliminado encontrado con código: " + codigo, thrown.getCause().getMessage());
    }

	
	@Test
    @Transactional
    public void CreateConsultorioTest() {
        when(ubicacionRepository.searchByDetails(anyString(), anyString(), anyString(), anyInt()))
            .thenReturn(new Ubicacion());
        Medico medico = new Medico();
        when(medicoRepository.findByDni(anyInt())).thenReturn(Optional.of(medico));

        ConsultorioRequestDto dto = createConsultorioRequestDto();

        ConsultorioResponseDto responseDto = consultorioService.createConsultorio(dto);

        assertNotNull(responseDto);
    }

	private ConsultorioRequestDto createConsultorioRequestDto() {
	    ConsultorioRequestDto dto = new ConsultorioRequestDto();

	    List<HorarioRequestDto> horarios = new ArrayList<>();

	    HorarioRequestDto horario1 = new HorarioRequestDto();
	    horario1.setDiaSemana(Horario.DiaSemana.LUNES);
	    horario1.setHoraInicio(LocalTime.parse("08:00:00"));
	    horario1.setHoraFin(LocalTime.parse("12:00:00"));
	    horario1.setCodigo("2f154");
	    horarios.add(horario1);

	    HorarioRequestDto horario2 = new HorarioRequestDto();
	    horario2.setDiaSemana(Horario.DiaSemana.MARTES);
	    horario2.setHoraInicio(LocalTime.parse("11:00:30"));
	    horario2.setHoraFin(LocalTime.parse("16:00:00"));
	    horario2.setCodigo("ec05d");
	    horarios.add(horario2);

	    dto.setHorarioAtencion(horarios);

	    UbicacionRequestDto ubicacion = new UbicacionRequestDto();
	    ubicacion.setCiudad("San Juan");
	    ubicacion.setProvincia("San Juan");
	    ubicacion.setCalle("Laprida");
	    ubicacion.setAltura(1234);
	    ubicacion.setCodigo("63b75");

	    dto.setUbicacion(ubicacion);
	    
	    Date fechaNacimiento = new Date(90, 0, 1);
	    MedicoRequestDto medicoDto = new MedicoRequestDto();
	    medicoDto.setNombre("Juan");
	    medicoDto.setApellido("Perez");
	    medicoDto.setTelefono("123456789");
	    medicoDto.setEmail("juan@example.com");
	    medicoDto.setDni(12345678); 
	    medicoDto.setCuil("20-12345678-0");
	    medicoDto.setFechaNacimiento(fechaNacimiento);
	    medicoDto.setEspecialidad("Pediatría");

	    dto.setMedico(medicoDto);

	    return dto;
	}
	
	@Test
    @Transactional
    void DeleteConsultorioTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(false);

        PanacheQuery<Consultorio> mockedQuery = Mockito.mock(PanacheQuery.class);

        when(consultorioRepository.find("codigo", codigo)).thenReturn(mockedQuery);
        when(mockedQuery.firstResultOptional()).thenReturn(Optional.of(consultorio));

        boolean result = consultorioService.deleteConsultorio(codigo);

        assertTrue(result);
        assertTrue(consultorio.isEstaEliminado());
    }

	@Test
    @Transactional
    void RestoreConsultorioDeletedTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(false);

        PanacheQuery<Consultorio> mockedQuery = Mockito.mock(PanacheQuery.class);

        when(consultorioRepository.find("codigo", codigo)).thenReturn(mockedQuery);
        when(mockedQuery.firstResultOptional()).thenReturn(Optional.of(consultorio));

        Response response = consultorioService.restoreConsultorio(codigo);

        assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), response.getStatus());
        assertEquals("El consultorio no está eliminado.", response.getEntity());
    }

}
