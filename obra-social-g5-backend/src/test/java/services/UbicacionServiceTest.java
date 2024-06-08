package services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.repositories.UbicacionRepository;
import org.softek.g5.services.UbicacionService;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.InjectMock;
import io.quarkus.test.Mock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;

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
    public void getAllUbicaciones_ShouldReturnListOfUbicaciones() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, "U001"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, "U002"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        List<UbicacionResponseDto> result = ubicacionService.getAllUbicaciones();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(ubicacionRepository).listAll();
    }

    @Test
    public void getAllUbicacionesDeleted_ShouldReturnListOfDeletedUbicaciones() {
        List<Ubicacion> ubicaciones = List.of(
                new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, true, "U001"),
                new Ubicacion(2L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U002"));
        when(ubicacionRepository.listAll()).thenReturn(ubicaciones);

        List<UbicacionResponseDto> result = ubicacionService.getAllUbicacionesDeleted();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(ubicacionRepository).listAll();
    }

    @Test
    public void getUbicacionByCodigo_ShouldReturnUbicacion() {
        Ubicacion ubicacion = new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, "U001");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));
        when(ubicacionRepository.find("codigo", "U001")).thenReturn(mockQuery);

        UbicacionResponseDto result = ubicacionService.getUbicacionByCodigo("U001");

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).find("codigo", "U001");
    }

    @Test
    public void createUbicacion_ShouldCreateUbicacion() {
        String codigo = UUID.randomUUID().toString().substring(0, 10);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);
        Ubicacion ubicacion = new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, codigo);
        doNothing().when(ubicacionRepository).persist(any(Ubicacion.class));
        
        UbicacionResponseDto result = ubicacionService.createUbicacion(requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }


    @Test
    public void updateUbicacion_ShouldUpdateUbicacion() {
		String codigo = UUID.randomUUID().toString().substring(0, 10);
	    UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, codigo);
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U001")).thenReturn(mockQuery);

        UbicacionResponseDto result = ubicacionService.updateUbicacion("U001", requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }

    @Test
    public void deleteUbicacion_ShouldDeleteUbicacion() {
        // Arrange
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, "U001");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U001")).thenReturn(mockQuery);

        // Act
        Response result = ubicacionService.deleteUbicacion("U001");

        // Assert
        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }

    @Test
    public void restoreUbicacion_ShouldRestoreUbicacion() {
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U001");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U001")).thenReturn(mockQuery);

        Response result = ubicacionService.restoreUbicacion("U001");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }
}