package horarioTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalTime;
import java.util.*;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.horario.Horario;
import org.softek.g5.entities.horario.dto.HorarioRequestDto;
import org.softek.g5.entities.horario.dto.HorarioResponseDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
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

    /* getAllHorarios Tests */

    @Test
    public void getAllHorariosSuccessTest() {
        List<Horario> horarios = new ArrayList<>();
        horarios.add(new Horario(1L, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0015"));
        horarios.add(new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0025"));

        when(horarioRepository.listAll()).thenReturn(horarios);

        List<HorarioResponseDto> result = horarioService.getAllHorarios();

        assertNotNull(result);
        assertEquals(2, result.size());
    }
    @Test
    public void getAllHorariosListIsEmptyTest() {
        when(horarioRepository.listAll()).thenReturn(new ArrayList<>());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            horarioService.getAllHorarios();
        });

        assertEquals("Aún no hay registro de horarios", exception.getMessage());
    }
    @Test
    public void getAllHorariosDeletedEmptyListTest() {
        List<Horario> horarios = new ArrayList<>();
        horarios.add(new Horario(1L, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H0015"));
        horarios.add(new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H0025"));

        when(horarioRepository.listAll()).thenReturn(horarios);

        List<HorarioResponseDto> result = horarioService.getAllHorarios();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
    @Test
    public void getAllHorariosErrorTest() {
        when(horarioRepository.listAll()).thenThrow(new RuntimeException("Error de servidor"));

        CustomServerException exception = assertThrows(CustomServerException.class, () -> {
            horarioService.getAllHorarios();
        });

        assertEquals("Error al obtener todos los horarios", exception.getMessage());
    }

    /* getAllHorariosDeleted Tests */

    @Test
    public void getAllHorariosDeletedSuccessTest() {
        List<Horario> horariosEliminados = Arrays.asList(
                new Horario(3L, Horario.DiaSemana.MIERCOLES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H0035")
        );
        when(horarioRepository.listAll()).thenReturn(horariosEliminados);

        List<HorarioResponseDto> result = horarioService.getAllHorariosDeleted();

        assertNotNull(result);
        assertEquals(1, result.size()); for (HorarioResponseDto horarioResponseDto : result) {
            assertTrue(horarioResponseDto.isEstaEliminado());
        }
    }
    @Test
    public void getAllHorariosDeletedListHorariosEmptyTest() {
        when(horarioRepository.listAll()).thenReturn(Collections.emptyList());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            horarioService.getAllHorariosDeleted();
        });

        assertEquals("Aún no hay registro de horarios", exception.getMessage());
    }

    @Test
    public void getAllHorariosDeletedListEmptyTest() {
        List<Horario> horarios = Arrays.asList(
                new Horario(1L, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0015"),
                new Horario(2L, Horario.DiaSemana.MARTES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0025")
        );
        when(horarioRepository.listAll()).thenReturn(horarios);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            horarioService.getAllHorariosDeleted();
        });

        assertEquals("No hay registro de horarios eliminados", exception.getMessage());
    }

    @Test
    public void getAllHorariosDeletedErrorTest() {
        when(horarioRepository.listAll()).thenThrow(new RuntimeException("Error de base de datos"));

        CustomServerException exception = assertThrows(CustomServerException.class, () -> {
            horarioService.getAllHorariosDeleted();
        });

        assertEquals("Error al obtener todos los horarios eliminados", exception.getMessage());
    }

    /* getAllHorariosDeleted Tests */

    @Test
    public void getHorarioByCodigoSuccessTest() {

        Horario horario = new Horario(4L, Horario.DiaSemana.JUEVES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H0045");
        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(horario));
        when(horarioRepository.find("codigo", "H0045")).thenReturn(mockQuery);

        HorarioResponseDto result = horarioService.getHorarioByCodigo("H0045");

        assertNotNull(result);
        assertEquals("H0045", result.getCodigo());
    }
    @Test
    public void getHorarioByCodigoHorarioNotFoundTest() {
        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());
        when(horarioRepository.find("codigo", "H0045")).thenReturn(mockQuery);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            horarioService.getHorarioByCodigo("H0045");
        });

        assertEquals("Horario no encontrado", exception.getMessage());
    }
    @Test
    public void getHorarioByCodigoHorarioEliminadoTest() {
        Horario horario = new Horario(4L, Horario.DiaSemana.JUEVES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H0045");
        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(horario));
        when(horarioRepository.find("codigo", "H0045")).thenReturn(mockQuery);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            horarioService.getHorarioByCodigo("H0045");
        });

        assertEquals("Horario no encontrado", exception.getMessage());
    }
    @Test
    public void getHorarioByCodigoErrorServidorTest() {
        when(horarioRepository.find("codigo", "H0045")).thenThrow(new RuntimeException("Error de servidor"));

        CustomServerException exception = assertThrows(CustomServerException.class, () -> {
            horarioService.getHorarioByCodigo("H0045");
        });

        assertEquals("Error al obtener el horario por código", exception.getMessage());
    }

    /* createHorario Tests */

    @Test
    public void createHorarioSuccessTest() {
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), "GENERATED_CODE");
        UbicacionRequestDto ubicacionDto = UbicacionRequestDto.builder()
                .ciudad("ciudad")
                .provincia("provincia")
                .calle("calle")
                .altura(123)
                .build();

        Consultorio consultorioMock = new Consultorio();
        when(consultorioRepository.findByUbicacion(anyString(), anyString(), anyString(), anyInt())).thenReturn(consultorioMock);

        assertDoesNotThrow(() -> horarioService.createHorario(requestDto, ubicacionDto));
        verify(consultorioRepository, times(1)).findByUbicacion(anyString(), anyString(), anyString(), anyInt());
    }
    @Test
    public void createHorarioUbicacionNotFoundTest() {
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), "GENERATED_CODE");
        UbicacionRequestDto ubicacionDto = UbicacionRequestDto.builder()
                .ciudad("ciudad")
                .provincia("provincia")
                .calle("calle")
                .altura(123)
                .build();

        when(consultorioRepository.findByUbicacion(anyString(), anyString(), anyString(), anyInt())).thenReturn(null);

        CustomServerException exception = assertThrows(CustomServerException.class, () -> {
            horarioService.createHorario(requestDto, ubicacionDto);
        });

        assertEquals("No se encontró ningún consultorio para la ubicación proporcionada", exception.getMessage());
    }

    /* updateHorario Tests */

    @Test
    public void updateHorarioSuccessTest() throws CustomServerException {
        Horario horarioExistente = new Horario(1L, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, false, "H001");
        when(horarioRepository.findByCodigo("H001")).thenReturn(horarioExistente);

        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), "H001");

        HorarioResponseDto result = horarioService.updateHorario("H001", requestDto);

        assertNotNull(result);
        assertEquals(Horario.DiaSemana.MARTES, result.getDiaSemana());
        assertEquals(LocalTime.of(10, 0), result.getHoraInicio());
        assertEquals(LocalTime.of(18, 0), result.getHoraFin());
        assertEquals("H001", result.getCodigo());
        assertFalse(result.isEstaEliminado());
        verify(horarioRepository, times(1)).persist(any(Horario.class));
    }
    @Test
    public void updateHorarioNotFoundTest() {
        when(horarioRepository.findByCodigo("H001")).thenReturn(null);
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), "H001");

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> horarioService.updateHorario("H001", requestDto));

        assertEquals("Horario no encontrado", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }
    @Test
    public void updateHorarioEliminadoTest() {
        Horario horarioEliminado = new Horario(1L, Horario.DiaSemana.LUNES, LocalTime.of(9, 0), LocalTime.of(17, 0), null, true, "H001");
        when(horarioRepository.findByCodigo("H001")).thenReturn(horarioEliminado);
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), "H001");

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> horarioService.updateHorario("H001", requestDto));

        assertEquals("El horario está eliminado", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }
    @Test
    public void updateHorarioErrorTest() {
        when(horarioRepository.findByCodigo("H001")).thenThrow(new RuntimeException("Error en la base de datos"));
        HorarioRequestDto requestDto = new HorarioRequestDto(Horario.DiaSemana.MIERCOLES, LocalTime.of(11, 0), LocalTime.of(19, 0), "H001");

        CustomServerException exception = assertThrows(CustomServerException.class,
                () -> horarioService.updateHorario("H001", requestDto));

        assertEquals("Error al actualizar horario", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }

    /* updateHorario Tests */

    @Test
    public void deleteHorarioSuccessTest() {

        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);


        Response result = horarioService.deleteHorario("H0015");

        assertNotNull(result);
        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), result.getStatus());
        assertTrue(existingHorario.isEstaEliminado());
        verify(horarioRepository).persist(existingHorario);
    }
    @Test
    public void deleteHorarioNotFoundTest() {
        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> horarioService.deleteHorario("H0015"));

        assertEquals("Horario no encontrado", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }
    @Test
    public void deleteHorarioErrorTest() {
        when(horarioRepository.find("codigo", "H0015")).thenThrow(new RuntimeException("Error en la base de datos"));

        CustomServerException exception = assertThrows(CustomServerException.class,
                () -> horarioService.deleteHorario("H0015"));

        assertEquals("Error al eliminar el horario", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }

    /* restoreHorario Tests */


    @Test
    public void restoreHorarioSuccessTest() {
        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, true, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);


        Response result = horarioService.restoreHorario("H0015");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        assertEquals("Horario restaurado con éxito.", result.getEntity());
        assertFalse(existingHorario.isEstaEliminado()); // Verifica que se haya restaurado el horario
        verify(horarioRepository).persist(existingHorario);
    }
    @Test
    public void restoreHorarioNotFoundTest() {
        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> horarioService.restoreHorario("H0015"));

        assertEquals("Horario no encontrado con código: H0015", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }
    @Test
    public void restoreHorarioNotDeletedTest() {
        Horario existingHorario = new Horario(1L, Horario.DiaSemana.MARTES, LocalTime.of(10, 0), LocalTime.of(18, 0), null, false, "H0015");

        PanacheQuery<Horario> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingHorario));
        when(horarioRepository.find("codigo", "H0015")).thenReturn(mockQuery);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> horarioService.restoreHorario("H0015"));

        assertEquals("El horario no está eliminado", exception.getMessage());
        verify(horarioRepository, never()).persist((Horario) any());
    }
}
