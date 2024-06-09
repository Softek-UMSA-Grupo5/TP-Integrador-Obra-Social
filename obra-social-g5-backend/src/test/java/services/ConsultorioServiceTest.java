package services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.hibernate.service.spi.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.softek.g5.entities.consultorio.dto.*;
import org.softek.g5.entities.consultorio.Consultorio;
import org.softek.g5.entities.ubicacion.Ubicacion;
import org.softek.g5.repositories.ConsultorioRepository;
import org.softek.g5.services.ConsultorioService;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.junit.QuarkusTest;


@QuarkusTest
@ExtendWith(MockitoExtension.class)
public class ConsultorioServiceTest {

	
	@InjectMocks
    private ConsultorioService consultorioService;

    @Mock
    private ConsultorioRepository consultorioRepository;
    @Mock
    ConsultorioRepository consultorioRepositoryMock;
    @Mock
    private PanacheQuery<Consultorio> mockPanacheQuery;
    

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void testGetAllConsultorios() {
        // Crear una ubicación mock
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCodigo("UB1234");

        // Crear consultorios mock con ubicaciones no nulas
        Consultorio consultorio1 = new Consultorio();
        consultorio1.setEstaEliminado(false);
        consultorio1.setHorarioAtencion(new ArrayList<>()); // Evitar NullPointerException
        consultorio1.setUbicacion(ubicacion);

        Consultorio consultorio2 = new Consultorio();
        consultorio2.setEstaEliminado(false);
        consultorio2.setHorarioAtencion(new ArrayList<>()); // Evitar NullPointerException
        consultorio2.setUbicacion(ubicacion);

        List<Consultorio> consultorios = Arrays.asList(consultorio1, consultorio2);
        when(consultorioRepository.listAll()).thenReturn(consultorios);

        List<ConsultorioResponseDto> result = consultorioService.getAllConsultorios();

        assertEquals(2, result.size());
        verify(consultorioRepository, times(1)).listAll();
    }
    
    @Test
    public void testGetConsultorioByCodigo_Success() {
        // Arrange
        String codigo = "C1234";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);

        // Creamos un mock de PanacheQuery
        PanacheQuery<Consultorio> panacheQueryMock = mock(PanacheQuery.class);

        // Configuramos el mock del repositorio para que devuelva el mock de PanacheQuery
        when(consultorioRepositoryMock.find(anyString(), any(Object[].class))).thenReturn(panacheQueryMock);

        // Configuramos el mock de PanacheQuery para que devuelva un Optional con el consultorio
        Optional<Consultorio> optionalConsultorio = Optional.of(consultorio);
        when(panacheQueryMock.firstResultOptional()).thenReturn(optionalConsultorio);

        // Act
        ConsultorioResponseDto response = consultorioService.getConsultorioByCodigo(codigo);

        // Assert
        assertNotNull(response);
        assertEquals(codigo, response.getCodigo());
        // Verificamos que el método find del repositorio haya sido invocado con los argumentos esperados
        verify(consultorioRepositoryMock).find("codigo", new Object[]{codigo});
    }




//    @Test
//    public void testGetConsultorioByCodigo_NotFound() {
//        // Arrange
//        String codigo = "C123";
//
//        // Configurar el comportamiento del mock para que devuelva un Optional vacío
//        when(consultorioRepositoryMock.find("codigo", codigo)).thenReturn(Optional.of(consultorio));
//
//        // Act & Assert
//        assertThrows(ConsultorioNotFoundException.class, () -> consultorioService.getConsultorioByCodigo(codigo));
//        verify(consultorioRepositoryMock, times(1)).find("codigo", codigo);
//    }

    @Test
    public void testGetConsultorioByCodigoServiceExceptionTest() {
        // Arrange
        String codigo = "C1234";
        when(consultorioRepository.find("codigo", codigo)).thenThrow(new RuntimeException());

        // Act & Assert
        assertThrows(ServiceException.class, () -> consultorioService.getConsultorioByCodigo(codigo));
        verify(consultorioRepository, times(1)).find("codigo", codigo);
    }
	
//    @Test
//    public void testCreateConsultorio() {
//        ConsultorioRequestDto dto = new ConsultorioRequestDto();
//        // Configurar dto con datos de prueba
//
//        Consultorio consultorio = new Consultorio();
//        when(consultorioRepository.persist(any(Consultorio.class))).thenReturn(null);
//
//        Ubicacion ubicacion = new Ubicacion();
//        when(ubicacionRepository.searchByDetails(anyString(), anyString(), anyString(), anyString())).thenReturn(ubicacion);
//
//        Medico medico = new Medico();
//        when(medicoRepository.findByDni(anyString())).thenReturn(Optional.of(medico));
//
//        ConsultorioResponseDto response = consultorioService.createConsultorio(dto);
//
//        assertNotNull(response);
//        verify(consultorioRepository, times(1)).persist(any(Consultorio.class));
//        verify(horarioService, times(dto.getHorarioAtencion().size())).createHorario(any(HorarioRequestDto.class), any(Ubicacion.class));
//    }
//    @Test
//    public void testGetConsultorioByCodigoNotFound() {
//        String codigo = "testCodigo";
//
//        when(consultorioRepository.find("codigo", codigo)).thenReturn(Optional.empty());
//
//        Exception exception = assertThrows(ConsultorioNotFoundException.class, () -> {
//            consultorioService.getConsultorioByCodigo(codigo);
//        });
//
//        String expectedMessage = "Consultorio no encontrado";
//        String actualMessage = exception.getMessage();
//
//        assertTrue(actualMessage.contains(expectedMessage));
//        verify(consultorioRepository, times(1)).find("codigo", codigo);
//    }

}