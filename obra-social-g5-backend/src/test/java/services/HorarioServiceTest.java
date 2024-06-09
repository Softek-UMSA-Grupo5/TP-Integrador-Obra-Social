package services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.exceptions.entitiesCustomException.horario.HorarioNotFoundException;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.services.HorarioService;


import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class HorarioServiceTest {

    @Mock
    private HorarioRepository horarioRepository;

    @Mock
    private ConsultorioRepository consultorioRepository;
    
    @InjectMocks
    private HorarioService horarioService;
    

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(consultorioRepository.findByUbicacion(anyString(), anyString(), anyString(), anyInt()))
        .thenReturn(new Consultorio());
        
    }
    
    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(horarioRepository);
        assertNotNull(consultorioRepository);
        assertNotNull(horarioService);
    }

    @Test
    public void getAllHorariosTest() {

    	List<Horario> horarios = new ArrayList<>();
    	horarios.add(new Horario(1L,Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0015"));
    	horarios.add(new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9,0), LocalTime.of(17,0), null, false, "H0025"));

        when(horarioRepository.listAll()).thenReturn(horarios);

        List<HorarioResponseDto> result = horarioService.getAllHorarios();

     


        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void getAllHorariosDeletedTest() {


        List<Horario> horariosEliminados = Arrays.asList(
                new Horario(3L,Horario.DiaSemana.MIERCOLES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H0035")
        );
        when(horarioRepository.listAll()).thenReturn(horariosEliminados);

        List<HorarioResponseDto> result = horarioService.getAllHorariosDeleted();

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    public void getHorarioByCodigoTest() {

        Horario horario = new Horario(4L, Horario.DiaSemana.JUEVES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0045");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(horario));
        when(horarioRepository.find("codigo", "H0045")).thenReturn(mockQuery);

        HorarioResponseDto result = horarioService.getHorarioByCodigo("H0045");

        assertNotNull(result);
        assertEquals("H0045", result.getCodigo());
    }


    @Test
    public void createHorarioTest() {

        // Arrange
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), "GENERATED_CODE");
        UbicacionRequestDto ubicacionDto = UbicacionRequestDto.builder()
                                .ciudad("ciudad")
                                .provincia("provincia")
                                .calle("calle")
                                .altura(123)
                                .build();
        
        assertDoesNotThrow(() -> horarioService.createHorario(requestDto, ubicacionDto));
        

        verify(horarioRepository, times(1)).persist(any(Horario.class));
    }


    @Test
    public void updateHorarioTest() {
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), "GENERATED_CODE");

        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);

        HorarioResponseDto result = horarioService.updateHorario("H0015", requestDto);

        assertNotNull(result);
        assertEquals(Horario.DiaSemana.LUNES, result.getDiaSemana());
        assertEquals(LocalTime.of(9, 0), result.getHoraInicio());
        assertEquals(LocalTime.of(17, 0), result.getHoraFin());
        verify(horarioRepository).persist(any(Horario.class));
    }

    @Test
    public void deleteHorarioTest() {

        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);


        Response result = horarioService.deleteHorario("H0015");

        assertNotNull(result);
        assertEquals(204, result.getStatus());
        verify(horarioRepository).persist(any(Horario.class));
    }

    @Test
    public void restoreHorarioTest() {

                Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, true, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);

        Response result = horarioService.restoreHorario("H0015");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(horarioRepository).persist(any(Horario.class));
    }
    
    @Test
    public void createHorarioMinimumValuesTest() {
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.MIN, LocalTime.MIN, "GENERATED_CODE");
        UbicacionRequestDto ubicacionDto = UbicacionRequestDto.builder()
                                .ciudad("ciudad")
                                .provincia("provincia")
                                .calle("calle")
                                .altura(1)
                                .build();

        assertDoesNotThrow(() -> horarioService.createHorario(requestDto, ubicacionDto));

        verify(horarioRepository, times(1)).persist(any(Horario.class));
    }
    


    @Test
    public void getAllHorariosCallListAllFromRepositoryTest() {
        List<Horario> horarios = Arrays.asList(
            new Horario(1L,Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0015"),
            new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9,0), LocalTime.of(17,0), null, false, "H0025")
        );

        when(horarioRepository.listAll()).thenReturn(horarios);

        List<HorarioResponseDto> result = horarioService.getAllHorarios();

        assertNotNull(result);
        assertEquals(2, result.size());
    }


}
