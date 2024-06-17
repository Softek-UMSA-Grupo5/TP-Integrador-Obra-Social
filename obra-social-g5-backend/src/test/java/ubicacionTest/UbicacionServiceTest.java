package ubicacionTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.UbicacionFactory;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.services.UbicacionService;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.softek.g5.validation.entitiesValidation.UbicacionValidator;

@QuarkusTest
public class UbicacionServiceTest {

    @Inject
    @InjectMocks
    UbicacionService ubicacionService;

    @InjectMock
    UbicacionRepository ubicacionRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void dependenciesInjectionTest() {
        assertNotNull(ubicacionService);
        assertNotNull(ubicacionRepository);
    }

    /* getAllUbicaciones Tests */

    @Test
    public void getAllUbicacionesSuccessTest() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, "U0015"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, "U0025"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        List<UbicacionResponseDto> result = ubicacionService.getAllUbicaciones();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesNotFoundTest() {
        when(ubicacionRepository.listAll()).thenReturn(Collections.emptyList());

        assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.getAllUbicaciones();
        });

        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesEliminadasTest() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, true, "U0015"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U0025"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        List<UbicacionResponseDto> result = ubicacionService.getAllUbicaciones();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesErrorTest() {
        when(ubicacionRepository.listAll()).thenThrow(new RuntimeException("Error de base de datos"));

        assertThrows(CustomServerException.class, () -> {
            ubicacionService.getAllUbicaciones();
        });

        verify(ubicacionRepository).listAll();
    }

    /* getAllUbicacionesDeleted Tests */

    @Test
    public void getAllUbicacionesDeletedSuccessTest() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, true, "U0015"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U0025"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        List<UbicacionResponseDto> result = ubicacionService.getAllUbicacionesDeleted();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesDeletedNotFoundTest() {
        when(ubicacionRepository.listAll()).thenReturn(Collections.emptyList());

        assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.getAllUbicacionesDeleted();
        });

        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesDeletedNoEliminadasTest() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, "U0015"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, "U0025"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.getAllUbicacionesDeleted();
        });

        verify(ubicacionRepository).listAll();
    }
    @Test
    public void getAllUbicacionesDeletedErrorTest() {
        when(ubicacionRepository.listAll()).thenThrow(new RuntimeException("Error de base de datos"));

        assertThrows(CustomServerException.class, () -> {
            ubicacionService.getAllUbicacionesDeleted();
        });

        verify(ubicacionRepository).listAll();
    }

    /* getUbicacionByCodigo Tests */

    @Test
    public void getUbicacionByCodigoSuccessTest() {
        Ubicacion ubicacion = new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, "U0015");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        UbicacionResponseDto result = ubicacionService.getUbicacionByCodigo("U0015");

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).find("codigo", "U0015");
    }
    @Test
    public void getUbicacionByCodigoNotFoundTest() {
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.getUbicacionByCodigo("U0015");
        });

        verify(ubicacionRepository).find("codigo", "U0015");
    }
    @Test
    public void getUbicacionByCodigoEliminadaTest() {
        Ubicacion ubicacion = new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, true, "U0015");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.getUbicacionByCodigo("U0015");
        });

        verify(ubicacionRepository).find("codigo", "U0015");
    }
    @Test
    public void getUbicacionByCodigoErrorTest() {
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenThrow(new RuntimeException("Error de base de datos"));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        assertThrows(CustomServerException.class, () -> {
            ubicacionService.getUbicacionByCodigo("U0015");
        });

        verify(ubicacionRepository).find("codigo", "U0015");
    }

    /* createUbicacion Tests */

    @Test
    public void createUbicacionSuccessTest(){
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, "U001");

        UbicacionResponseDto result = ubicacionService.createUbicacion(requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());

        verify(ubicacionRepository, times(1)).persist(any(Ubicacion.class));
    }
    @Test
    public void createUbicacionParametersInvalidTest() {
        UbicacionRequestDto requestDto = new UbicacionRequestDto(null, "ProvinciaA", "DireccionA", 123, "U001");

        assertThrows(IllegalArgumentException.class, () -> ubicacionService.createUbicacion(requestDto));

        verify(ubicacionRepository, never()).persist(any(Ubicacion.class));
    }
    @Test
    public void createUbicacionErrorTest() {
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, "U001");

        doThrow(new CustomServerException("Error en el repositorio")).when(ubicacionRepository).persist(any(Ubicacion.class));

        assertThrows(CustomServerException.class, () -> ubicacionService.createUbicacion(requestDto));

        verify(ubicacionRepository, times(1)).persist(any(Ubicacion.class));
    }
    @Test
    public void createUbicacionValidParametersTest() throws CustomServerException {
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, "U001");

        doNothing().when(ubicacionRepository).persist(any(Ubicacion.class));

        UbicacionResponseDto result = ubicacionService.createUbicacion(requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());

        verify(ubicacionRepository, times(1)).persist(any(Ubicacion.class));
    }

    /* updateUbicacion Tests */

    @Test
    public void updateUbicacionSuccessTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);

        when(ubicacionRepository.findByCodigo(eq(codigo))).thenReturn(null);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.updateUbicacion(codigo, requestDto);
        });

        assertEquals("Ubicación no encontrada ", exception.getMessage());
        verify(ubicacionRepository, never()).persist((Ubicacion) any());
    }

    @Test
    public void updateUbicacionUbicacionNotFoundTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);

        when(ubicacionRepository.findByCodigo(eq(codigo))).thenReturn(null);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.updateUbicacion(codigo, requestDto);
        });

        assertEquals("Ubicación no encontrada ", exception.getMessage());
        verify(ubicacionRepository, never()).persist((Ubicacion) any());
    }
    @Test
    public void updateUbicacionEliminadaTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);
        Ubicacion ubicacionEliminada = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, codigo);

        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacionEliminada));
        when(ubicacionRepository.find("codigo", codigo)).thenReturn(mockQuery);

        assertThrows(EntityNotFoundException.class, () -> ubicacionService.updateUbicacion(codigo, requestDto));
        verify(ubicacionRepository, never()).persist(any(Ubicacion.class));
    }
    @Test
    public void updateUbicacionParametersInvalidTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto(null, "ProvinciaA", "DireccionA", 123, codigo);

        assertThrows(IllegalArgumentException.class, () -> ubicacionService.updateUbicacion(codigo, requestDto));
        verify(ubicacionRepository, never()).persist(any(Ubicacion.class));
    }
    @Test
    public void updateUbicacionValidParametersTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);

        when(ubicacionRepository.findByCodigo(eq(codigo))).thenReturn(null);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            ubicacionService.updateUbicacion(codigo, requestDto);
        });

        assertEquals("Ubicación no encontrada ", exception.getMessage());
        verify(ubicacionRepository, never()).persist((Ubicacion) any());
    }

    /* deleteUbicacion Tests */

    @Test
    public void deleteUbicacionSuccessTest() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCodigo("H001");

        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H001")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));

        assertDoesNotThrow(() -> ubicacionService.deleteUbicacion("H001"));
        assertTrue(ubicacion.isEstaEliminado());
    }
    @Test
    public void deleteUbicacionNotFoundTest() {
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H002")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> ubicacionService.deleteUbicacion("H002"));

        assertEquals("No se encuentra la ubicación", exception.getMessage());
    }
    @Test
    public void deleteUbicacionYaEliminadaTest() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCodigo("H003");
        ubicacion.setEstaEliminado(true);

        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H003")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> ubicacionService.deleteUbicacion("H003"));

        assertEquals("La ubicación ya está eliminada", exception.getMessage());
    }
    @Test
    public void deleteUbicacionErrorTest() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCodigo("H004");

        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H004")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));
        doThrow(new RuntimeException("Error de base de datos")).when(ubicacionRepository).persist(ubicacion);

        CustomServerException exception = assertThrows(CustomServerException.class, () -> ubicacionService.deleteUbicacion("H004"));

        assertEquals("Error al eliminar la ubicación", exception.getMessage());
    }

    /* restoreUbicacion Tests */

    @Test
    public void restoreUbicacionSuccessTest() {
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U0015");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        Response result = ubicacionService.restoreUbicacion("U0015");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }
    @Test
    public void restoreUbicacionNoEliminadaTest() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCodigo("H001");
        ubicacion.setEstaEliminado(false);

        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H001")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> ubicacionService.restoreUbicacion("H001"));

        assertEquals("La ubicación no está eliminada", exception.getMessage());
    }
    @Test
    public void restoreUbicacionNotFoundTest() {
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(ubicacionRepository.find("codigo", "H002")).thenReturn(mockQuery);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> ubicacionService.restoreUbicacion("H002"));

        assertEquals("Ubicación no encontrada", exception.getMessage());
    }
}