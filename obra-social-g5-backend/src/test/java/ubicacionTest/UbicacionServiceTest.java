package ubicacionTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;


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
    public void dependenciesInjectionTest() {
        assertNotNull(ubicacionService);
        assertNotNull(ubicacionRepository);
    }

    @Test
    public void getAllUbicacionesTest() {
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
    public void getAllUbicacionesDeletedTest() {
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
    public void getUbicacionByCodigoTest() {
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
    public void createUbicacionTest() {
        String codigo = UUID.randomUUID().toString().substring(0, 5);
        UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);
        Ubicacion ubicacion = new Ubicacion(1L, "CiudadA", "ProvinciaA", "DireccionA", 123, false, codigo);
        doNothing().when(ubicacionRepository).persist(any(Ubicacion.class));
        
        UbicacionResponseDto result = ubicacionService.createUbicacion(requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }


    @Test
    public void updateUbicacionTest() {
		String codigo = UUID.randomUUID().toString().substring(0, 5);
	    UbicacionRequestDto requestDto = new UbicacionRequestDto("CiudadA", "ProvinciaA", "DireccionA", 123, codigo);
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, codigo);
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        UbicacionResponseDto result = ubicacionService.updateUbicacion("U0015", requestDto);

        assertNotNull(result);
        assertEquals("CiudadA", result.getCiudad());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }

    @Test
    public void deleteUbicacionTest() {
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, false, "U0015");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        Response result = ubicacionService.deleteUbicacion("U0015");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }
    
    @Test
    public void deleteUbicacionReturn404IfUbicacionNotFoundTest() {
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.empty());
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        Response result = ubicacionService.deleteUbicacion("U0015");

        assertNotNull(result);
        assertEquals(404, result.getStatus());
        verify(ubicacionRepository, never()).persist(any(Ubicacion.class));
    }
    
    @Test
    public void notDeleteAlreadyDeletedUbicacionTest() {
    	Ubicacion ubicacion = new Ubicacion();
    	ubicacion.setEstaEliminado(true);
    	PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
    	when(ubicacionRepository.find(any(String.class), any(Object[].class))).thenReturn(mockQuery);
    	when(mockQuery.firstResultOptional()).thenReturn(Optional.of(ubicacion));

    	Response result = ubicacionService.deleteUbicacion("U0015");

    	assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), result.getStatus());
    	verify(ubicacionRepository, never()).persist(any(Ubicacion.class));

    }


    @Test
    public void restoreUbicacionTest() {
        Ubicacion existingUbicacion = new Ubicacion(1L, "CiudadB", "ProvinciaB", "DireccionB", 456, true, "U0015");
        PanacheQuery<Ubicacion> mockQuery = mock(PanacheQuery.class);
        when(mockQuery.firstResultOptional()).thenReturn(Optional.of(existingUbicacion));
        when(ubicacionRepository.find("codigo", "U0015")).thenReturn(mockQuery);

        Response result = ubicacionService.restoreUbicacion("U0015");

        assertNotNull(result);
        assertEquals(200, result.getStatus());
        verify(ubicacionRepository).persist(any(Ubicacion.class));
    }
}