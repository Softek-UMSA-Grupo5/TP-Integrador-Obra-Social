package consultorioTest;


import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.HorarioSuperpuestoException;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.sql.Date;
import java.time.LocalTime;
import java.util.*;

@QuarkusTest
@ExtendWith(MockitoExtension.class)
public class ConsultorioServiceTest {

	@InjectMocks
	private ConsultorioService consultorioService;
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
	public void setUp() {
	    MockitoAnnotations.openMocks(this);
	    
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


    /* GetAllConsultorios Test */


    @Test
    void GetAllConsultoriosTest() {
        Consultorio consultorio1 = new Consultorio();
        Consultorio consultorio2 = new Consultorio();
        when(consultorioRepository.listAll()).thenReturn(List.of(consultorio1, consultorio2));

        List<ConsultorioResponseDto> consultorios = consultorioService.getAllConsultorios();

        verify(consultorioRepository, times(1)).listAll();
        assertEquals(2, consultorios.size());
    }
    @Test
    void GetAllConsultoriosEmptyListTest() {
        when(consultorioRepository.listAll()).thenReturn(Collections.emptyList());

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.getAllConsultorios();
        });

        assertEquals("No hay consultorios registrados", thrown.getMessage());
        verify(consultorioRepository, times(1)).listAll();
    }
    @Test
    void GetAllConsultoriosServerErrorTest() {
        when(consultorioRepository.listAll()).thenThrow(new CustomServerException("Error en el repositorio"));

        CustomServerException thrown = assertThrows(CustomServerException.class, () -> {
            consultorioService.getAllConsultorios();
        });

        assertEquals("Error al obtener los consultorios", thrown.getMessage());
        verify(consultorioRepository, times(1)).listAll();
    }


    /* GetAllConsultoriosByCodigo Test */


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

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.getConsultorioByCodigo(codigo);
        });

        assertEquals("Consultorio no encontrado con código: " + codigo, thrown.getMessage());
    }
    @Test
    void GetConsultorioByCodigoEliminadoTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(true);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.getConsultorioByCodigo(codigo);
        });

        assertTrue(thrown.getMessage().contains("El consultorio está eliminado"));
    }
    @Test
    void GetConsultorioByCodigoErrorTest() {
        String codigo = "testCodigo";

        when(consultorioRepository.findByCodigo(codigo)).thenThrow(new CustomServerException("Error en el repositorio"));

        CustomServerException thrown = assertThrows(CustomServerException.class, () -> {
            consultorioService.getConsultorioByCodigo(codigo);
        });

        assertEquals("Error al obtener el consultorio por código", thrown.getMessage());
    }


    /* GetAllConsultoriosDeleted Test */


    @Test
    void GetAllConsultoriosDeletedSuccessTest() {
        Consultorio consultorio1 = new Consultorio();
        consultorio1.setCodigo("codigo1");
        consultorio1.setEstaEliminado(true);

        Consultorio consultorio2 = new Consultorio();
        consultorio2.setCodigo("codigo2");
        consultorio2.setEstaEliminado(false);

        List<Consultorio> consultorios = Arrays.asList(consultorio1, consultorio2);

        when(consultorioRepository.listAll()).thenReturn(consultorios);

        List<ConsultorioResponseDto> result = consultorioService.getAllConsultoriosDeleted();

        verify(consultorioRepository, times(1)).listAll();

        assertFalse(result.isEmpty());

        for (ConsultorioResponseDto dto : result) {
            assertTrue(dto.isEstaEliminado());
        }
    }
    @Test
    void GetAllConsultoriosDeletedCustomServerErrorTest() {
        when(consultorioRepository.listAll()).thenThrow(new CustomServerException("Error en el repositorio"));

        CustomServerException thrown = assertThrows(CustomServerException.class, () -> {
            consultorioService.getAllConsultoriosDeleted();
        });

        assertEquals("Error al obtener los consultorios eliminados", thrown.getMessage());

        verify(consultorioRepository, times(1)).listAll();
    }
    @Test
    void GetAllConsultoriosDeletedEmptyListTest() {
        List<Consultorio> consultorios = Collections.emptyList();

        when(consultorioRepository.listAll()).thenReturn(consultorios);

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.getAllConsultoriosDeleted();
        });

        assertEquals("No hay consultorios eliminados", thrown.getMessage());

        verify(consultorioRepository, times(1)).listAll();
    }


    /* CreateConsultorio Test */


    @Test
    public void testCreateConsultorioWithValidData() {
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();
        UbicacionRequestDto ubicacionRequestDto = consultorioRequestDto.getUbicacion();
        UbicacionResponseDto ubicacionResponseDto = createUbicacion();
        Medico medico = createMedicoEntity();
        List<HorarioRequestDto> horarios = consultorioRequestDto.getHorarioAtencion();

        // Mock del comportamiento de los repositorios y servicios
        when(ubicacionRepository.findByCodigo(ubicacionRequestDto.getCodigo())).thenReturn(null);
        when(ubicacionService.createUbicacion(any(UbicacionRequestDto.class))).thenReturn(ubicacionResponseDto);
        when(medicoRepository.findByDni(anyInt())).thenReturn(Optional.of(medico));

        // Ejecutar el método de servicio
        ConsultorioResponseDto responseDto = consultorioService.createConsultorio(consultorioRequestDto);

        // Verificaciones y aserciones
        assertNotNull(responseDto);
        verify(ubicacionService, times(1)).createUbicacion(ubicacionRequestDto);
        verify(consultorioRepository, times(1)).persist(any(Consultorio.class));
        verify(horarioService, times(horarios.size())).createHorario(any(HorarioRequestDto.class), eq(ubicacionRequestDto));
        verify(medicoRepository, times(1)).findByDni(anyInt());
    }
    @Test
    public void testCreateConsultorioWithOverlappingHorarios() {
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDtoWithOverlappingHorarios();

        // Ejecutar y verificar que lanza la excepción esperada
        assertThrows(HorarioSuperpuestoException.class, () -> consultorioService.createConsultorio(consultorioRequestDto));
    }

    @Test
    public void testCreateConsultorioWithExistingUbicacion() {
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();
        UbicacionRequestDto ubicacionRequestDto = consultorioRequestDto.getUbicacion();
        Ubicacion ubicacion = createUbicacionEntity();
        Medico medico = createMedicoEntity();
        List<HorarioRequestDto> horarios = consultorioRequestDto.getHorarioAtencion();

        // Mock del comportamiento de los repositorios y servicios
        when(ubicacionRepository.findByCodigo(ubicacionRequestDto.getCodigo())).thenReturn(ubicacion);
        when(medicoRepository.findByDni(anyInt())).thenReturn(Optional.of(medico));

        // Ejecutar el método de servicio
        ConsultorioResponseDto responseDto = consultorioService.createConsultorio(consultorioRequestDto);

        // Verificaciones y aserciones
        assertNotNull(responseDto);
        verify(ubicacionService, never()).createUbicacion(any(UbicacionRequestDto.class));
        verify(consultorioRepository, times(1)).persist(any(Consultorio.class));
        verify(horarioService, times(horarios.size())).createHorario(any(HorarioRequestDto.class), eq(ubicacionRequestDto));
        verify(medicoRepository, times(1)).findByDni(anyInt());
    }
    @Test
    public void testCreateConsultorioWithoutMedico() {
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDtoNoMedico();
        UbicacionRequestDto ubicacionRequestDto = consultorioRequestDto.getUbicacion();
        UbicacionResponseDto ubicacionResponseDto = createUbicacion();
        List<HorarioRequestDto> horarios = consultorioRequestDto.getHorarioAtencion();

        // Mock del comportamiento de los repositorios y servicios
        when(ubicacionRepository.findByCodigo(ubicacionRequestDto.getCodigo())).thenReturn(null);
        when(ubicacionService.createUbicacion(any(UbicacionRequestDto.class))).thenReturn(ubicacionResponseDto);

        // Ejecutar el método de servicio
        ConsultorioResponseDto responseDto = consultorioService.createConsultorio(consultorioRequestDto);

        // Verificaciones y aserciones
        assertNotNull(responseDto);
        verify(ubicacionService, times(1)).createUbicacion(ubicacionRequestDto);
        verify(consultorioRepository, times(1)).persist(any(Consultorio.class));
        verify(horarioService, times(horarios.size())).createHorario(any(HorarioRequestDto.class), eq(ubicacionRequestDto));
        verify(medicoRepository, never()).findByDni(anyInt());
    }
    @Test
    public void testCreateConsultorioWithNonExistentMedico() {
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();
        UbicacionRequestDto ubicacionRequestDto = consultorioRequestDto.getUbicacion();
        UbicacionResponseDto ubicacionResponseDto = createUbicacion();
        List<HorarioRequestDto> horarios = consultorioRequestDto.getHorarioAtencion();

        // Mock del comportamiento de los repositorios y servicios
        when(ubicacionRepository.findByCodigo(ubicacionRequestDto.getCodigo())).thenReturn(null);
        when(ubicacionService.createUbicacion(any(UbicacionRequestDto.class))).thenReturn(ubicacionResponseDto);
        when(medicoRepository.findByDni(anyInt())).thenReturn(Optional.empty());

        // Ejecutar el método de servicio
        ConsultorioResponseDto responseDto = consultorioService.createConsultorio(consultorioRequestDto);

        // Verificaciones y aserciones
        assertNotNull(responseDto);
        verify(ubicacionService, times(1)).createUbicacion(ubicacionRequestDto);
        verify(consultorioRepository, times(1)).persist(any(Consultorio.class));
        verify(horarioService, times(horarios.size())).createHorario(any(HorarioRequestDto.class), eq(ubicacionRequestDto));
        verify(medicoRepository, times(1)).findByDni(anyInt());
    }
    private ConsultorioRequestDto createConsultorioRequestDtoWithOverlappingHorarios() {
        List<HorarioRequestDto> overlappingHorarios = Arrays.asList(
                HorarioRequestDto.builder()
                        .diaSemana(Horario.DiaSemana.LUNES)
                        .horaInicio(LocalTime.of(9, 0))
                        .horaFin(LocalTime.of(11, 0))
                        .codigo("codigo1")
                        .build(),
                HorarioRequestDto.builder()
                        .diaSemana(Horario.DiaSemana.LUNES)
                        .horaInicio(LocalTime.of(10, 30))
                        .horaFin(LocalTime.of(12, 30))
                        .codigo("codigo2")
                        .build()
        );

        UbicacionRequestDto ubicacionRequestDto = new UbicacionRequestDto();
        ubicacionRequestDto.setCodigo("UB123");

        ConsultorioRequestDto consultorioRequestDto = new ConsultorioRequestDto();
        consultorioRequestDto.setUbicacion(ubicacionRequestDto);
        consultorioRequestDto.setHorarioAtencion(overlappingHorarios);

        return consultorioRequestDto;
    }
    private Medico createMedicoEntity(){
        Date fechaNacimiento = new Date(90, 0, 1);
        Medico medicoDto = new Medico();
        medicoDto.setNombre("Juan");
        medicoDto.setApellido("Perez");
        medicoDto.setTelefono("123456789");
        medicoDto.setEmail("juan@example.com");
        medicoDto.setDni(12345678);
        medicoDto.setCuil("20-12345678-0");
        medicoDto.setFechaNacimiento(fechaNacimiento);
        medicoDto.setEspecialidad("Pediatría");
        return medicoDto;
    }


    private Ubicacion createUbicacionEntity() {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCiudad("San Juan");
        ubicacion.setProvincia("San Juan");
        ubicacion.setCalle("Laprida");
        ubicacion.setAltura(1234);
        ubicacion.setCodigo("63b75");
        return ubicacion;
    }
    private UbicacionResponseDto createUbicacion() {
        UbicacionResponseDto ubicacion = new UbicacionResponseDto();
        ubicacion.setCiudad("San Juan");
        ubicacion.setProvincia("San Juan");
        ubicacion.setCalle("Laprida");
        ubicacion.setAltura(1234);
        ubicacion.setCodigo("63b75");
        return ubicacion;
    }
    private ConsultorioRequestDto createConsultorioRequestDtoNoMedico(){
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

        return dto;

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
    private Consultorio createConsultorioEntity() {
        Consultorio consultorio = new Consultorio();

        List<Horario> horarios = new ArrayList<>();

        Horario horario1 = new Horario();
        horario1.setDiaSemana(Horario.DiaSemana.LUNES);
        horario1.setHoraInicio(LocalTime.parse("08:00:00"));
        horario1.setHoraFin(LocalTime.parse("12:00:00"));
        horario1.setCodigo("2f154");
        horarios.add(horario1);

        Horario horario2 = new Horario();
        horario2.setDiaSemana(Horario.DiaSemana.MARTES);
        horario2.setHoraInicio(LocalTime.parse("11:00:30"));
        horario2.setHoraFin(LocalTime.parse("16:00:00"));
        horario2.setCodigo("ec05d");
        horarios.add(horario2);

        consultorio.setHorarioAtencion(horarios);

        Ubicacion ubicacion = createUbicacionEntity();
        consultorio.setUbicacion(ubicacion);

        Date fechaNacimiento = new Date(90, 0, 1);
        Medico medicoDto =  createMedicoEntity();
        consultorio.setMedico(medicoDto);

        return consultorio;
    }


    /* CreateConsultorio Test */


    @Test
    public void testUpdateConsultorioSuccess(){
        // Preparar los datos de prueba
        Consultorio consultorio = createConsultorioEntity();
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();

        // Mock del comportamiento de los repositorios y servicios
        when(consultorioRepository.findByUbicacion(consultorioRequestDto.getUbicacion().getCiudad(),consultorioRequestDto.getUbicacion().getProvincia(),consultorioRequestDto.getUbicacion().getCalle(),consultorioRequestDto.getUbicacion().getAltura())).thenReturn(consultorio);
        when(ubicacionRepository.findByCodigo(consultorioRequestDto.getUbicacion().getCodigo())).thenReturn(consultorio.getUbicacion());
        when(medicoRepository.findByDniMedico(anyInt())).thenReturn(createMedicoEntity());

        // Ejecutar el método de servicio
        consultorioService.updateConsultorio(consultorio.getMedico().getDni(), consultorioRequestDto);

        // Verificaciones y aserciones
        verify(consultorioRepository, times(1)).persistAndFlush(any(Consultorio.class));
    }
    @Test
    public void testUpdateConsultorioNotFound() throws CustomServerException{
        // Preparar los datos de prueba
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();

        // Mock del comportamiento de los repositorios y servicios
        when(consultorioRepository.findByUbicacion(
                consultorioRequestDto.getUbicacion().getCiudad(),
                consultorioRequestDto.getUbicacion().getProvincia(),
                consultorioRequestDto.getUbicacion().getCalle(),
                consultorioRequestDto.getUbicacion().getAltura()))
                .thenReturn(null);

        // Ejecutar y verificar que lanza la excepción esperada
        assertThrows(EntityNotFoundException.class, () -> consultorioService.updateConsultorio(1, consultorioRequestDto));
    }
    @Test
    public void testUpdateConsultorioInvalidUbicacion() {
        // Preparar los datos de prueba
        Consultorio consultorio = createConsultorioEntity();
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();

        // Mock del comportamiento de los repositorios y servicios
        when(consultorioRepository.findByUbicacion(
                consultorioRequestDto.getUbicacion().getCiudad(),
                consultorioRequestDto.getUbicacion().getProvincia(),
                consultorioRequestDto.getUbicacion().getCalle(),
                consultorioRequestDto.getUbicacion().getAltura()))
                .thenReturn(consultorio);
        when(ubicacionRepository.findByCodigo(consultorioRequestDto.getUbicacion().getCodigo()))
                .thenReturn(null);

        // Ejecutar y verificar que lanza la excepción esperada
        assertThrows(EntityNotFoundException.class, () -> consultorioService.updateConsultorio(1, consultorioRequestDto));
    }
    @Test
    public void testUpdateConsultorioMedicoNotFound() {
        // Preparar los datos de prueba
        Consultorio consultorio = createConsultorioEntity();
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDto();

        // Mock del comportamiento de los repositorios y servicios
        when(consultorioRepository.findByUbicacion(
                consultorioRequestDto.getUbicacion().getCiudad(),
                consultorioRequestDto.getUbicacion().getProvincia(),
                consultorioRequestDto.getUbicacion().getCalle(),
                consultorioRequestDto.getUbicacion().getAltura()))
                .thenReturn(consultorio);
        when(ubicacionRepository.findByCodigo(consultorioRequestDto.getUbicacion().getCodigo()))
                .thenReturn(consultorio.getUbicacion());
        when(medicoRepository.findByDniMedico(anyInt()))
                .thenReturn(null);

        // Ejecutar y verificar que lanza la excepción esperada
        assertThrows(EntityNotFoundException.class, () -> consultorioService.updateConsultorio(1, consultorioRequestDto));
    }
    @Test
    public void testUpdateConsultorioWithOverlappingHorarios() {
        // Preparar los datos de prueba
        Consultorio consultorio = createConsultorioEntity();
        ConsultorioRequestDto consultorioRequestDto = createConsultorioRequestDtoWithOverlappingHorarios();

        // Mock del comportamiento de los repositorios y servicios
        when(consultorioRepository.findByUbicacion(
                consultorioRequestDto.getUbicacion().getCiudad(),
                consultorioRequestDto.getUbicacion().getProvincia(),
                consultorioRequestDto.getUbicacion().getCalle(),
                consultorioRequestDto.getUbicacion().getAltura()))
                .thenReturn(consultorio);
        when(ubicacionRepository.findByCodigo(consultorioRequestDto.getUbicacion().getCodigo()))
                .thenReturn(consultorio.getUbicacion());
        when(medicoRepository.findByDniMedico(anyInt()))
                .thenReturn(createMedicoEntity());

        // Ejecutar y verificar que lanza la excepción esperada
        assertThrows(HorarioSuperpuestoException.class, () -> consultorioService.updateConsultorio(1, consultorioRequestDto));
    }



    /* DeleteConsultorio Test */


    @Test
    @Transactional
    public void DeleteConsultorioTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(false);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        boolean result = consultorioService.deleteConsultorio(codigo);

        assertTrue(result);
        assertTrue(consultorio.isEstaEliminado());
    }
    @Test
    @Transactional
    public void DeleteConsultorioNotFoundTest() {
        String codigo = "testCodigo";

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.empty());

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.deleteConsultorio(codigo);
        });

        assertEquals("Consultorio no encontrado", thrown.getMessage());
    }
    @Test
    @Transactional
    public void DeleteConsultorioAlreadyDeletedTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(true);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.deleteConsultorio(codigo);
        });

        assertEquals("El consultorio ya está eliminado", thrown.getMessage());
    }


    /* RestoreConsultorio Test */


    @Test
    @Transactional
    public void RestoreConsultorioTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(true);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        Response response = consultorioService.restoreConsultorio(codigo);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals("Consultorio restaurado con éxito.", response.getEntity());
        assertFalse(consultorio.isEstaEliminado());
    }
    @Test
    @Transactional
    public void RestoreConsultorioNotFoundTest() {
        String codigo = "testCodigo";

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.empty());

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.restoreConsultorio(codigo);
        });

        assertEquals("Consultorio no encontrado", thrown.getMessage());
    }
    @Test
    @Transactional
    public void RestoreConsultorioNotDeletedTest() {
        String codigo = "testCodigo";
        Consultorio consultorio = new Consultorio();
        consultorio.setCodigo(codigo);
        consultorio.setEstaEliminado(false);

        when(consultorioRepository.findByCodigo(codigo)).thenReturn(Optional.of(consultorio));

        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            consultorioService.restoreConsultorio(codigo);
        });

        assertEquals("El consultorio no está eliminado", thrown.getMessage());
    }
}
