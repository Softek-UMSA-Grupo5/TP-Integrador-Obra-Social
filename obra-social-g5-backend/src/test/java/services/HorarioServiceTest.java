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
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.repositories.HorarioRepository;
import org.softek.g5.services.HorarioService;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class HorarioServiceTest {

    @Mock
    private HorarioRepository horarioRepository;

    @InjectMocks
    private HorarioService horarioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getAllHorarios_ShouldReturnListOfHorarios() {
        // Arrange
    	List<Horario> horarios = new ArrayList<>();
    	horarios.add(new Horario(1L,Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H00113CAP5"));
    	horarios.add(new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9,0), LocalTime.of(17,0), null, false, "H002NRT41L"));

        when(horarioRepository.listAll()).thenReturn(horarios);

        // Act
        List<HorarioResponseDto> result = horarioService.getAllHorarios();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void getAllHorariosDeleted_ShouldReturnListOfDeletedHorarios() {
        // Arrange
        List<Horario> horariosEliminados = Arrays.asList(
                new Horario(3L,Horario.DiaSemana.MIERCOLES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H003NJ45OS")
        );
        when(horarioRepository.listAll()).thenReturn(horariosEliminados);

        // Act
        List<HorarioResponseDto> result = horarioService.getAllHorariosDeleted();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    public void getHorarioByCodigo_ShouldReturnHorario() {
        // Arrange
        Horario horario = new Horario(4L, Horario.DiaSemana.JUEVES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0045678AD");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(horario));
        when(horarioRepository.find("codigo", "H0045678AD")).thenReturn(mockQuery);

        // Act
        HorarioResponseDto result = horarioService.getHorarioByCodigo("H0045678AD");

        // Assert
        assertNotNull(result);
        assertEquals("H0045678AD", result.getCodigo());
    }


    @Test
    public void createHorario_ShouldCreateHorario() {
        // Arrange
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0));
        Horario horario = new Horario(null, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "GENERATED_CODE");

        doAnswer(invocation -> {
            Horario h = invocation.getArgument(0);
            h.setId(1L);  // Simulate setting an ID after persist
            return null;
        }).when(horarioRepository).persist(any(Horario.class));

        // Act
        Response result = horarioService.createHorario(requestDto);

        // Assert
        assertNotNull(result);
        assertEquals(201, result.getStatus());  // asserting the status code is 201 Created
        verify(horarioRepository, times(1)).persist(any(Horario.class));
    }

    @Test
    public void updateHorario_ShouldUpdateHorario() {
        // Arrange
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0));
        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H001567890");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H001567890")).thenReturn(mockQuery);

        // Act
        HorarioResponseDto result = horarioService.updateHorario("H001567890", requestDto);

        // Assert
        assertNotNull(result);
        assertEquals(Horario.DiaSemana.LUNES, result.getDiaSemana());
        assertEquals(LocalTime.of(9, 0), result.getHoraInicio());
        assertEquals(LocalTime.of(17, 0), result.getHoraFin());
        verify(horarioRepository).persist(any(Horario.class));
    }

    @Test
    public void deleteHorario_ShouldDeleteHorario() {
        // Arrange
        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H001567890");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H001567890")).thenReturn(mockQuery);

        // Act
        Response result = horarioService.deleteHorario("H001567890");

        // Assert
        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(horarioRepository).persist(any(Horario.class));
    }

    @Test
    public void restoreHorario_ShouldRestoreHorario() {
        // Arrange
        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, true, "H001567890");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H001567890")).thenReturn(mockQuery);

        // Act
        Response result = horarioService.restoreHorario("H001567890");

        // Assert
        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(horarioRepository).persist(any(Horario.class));
    }

}