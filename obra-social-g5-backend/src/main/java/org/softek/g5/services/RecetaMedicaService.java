package org.softek.g5.services;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
import org.softek.g5.entities.medicamento.Medicamento;
import org.softek.g5.entities.medicamento.MedicamentoFactory;
import org.softek.g5.entities.medicamento.dto.MedicamentoRequestDto;
import org.softek.g5.entities.recetaMedica.RecetaMedica;
import org.softek.g5.entities.recetaMedica.RecetaMedicaFactory;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaRequestDto;
import org.softek.g5.entities.recetaMedica.dto.RecetaMedicaResponseDto;
import org.softek.g5.exceptions.EmptyTableException;
import org.softek.g5.exceptions.entitiesCustomException.RecetaMedicaNotFoundException;
import org.softek.g5.repositories.RecetaMedicaRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@ApplicationScoped
@AllArgsConstructor
public class RecetaMedicaService {

	@Inject
	RecetaMedicaRepository recetaMedicaRepository;
	
	@Inject
	RecetaMedicaFactory recetaMedicaFactory;
	
	@Inject
	MedicamentoService medicamentoService;
	
	@Inject
	MedicamentoFactory medicamentoFactory;

	@Transactional
    public Collection<RecetaMedicaResponseDto> getRecetaMedica() {
        Collection<RecetaMedica> RecetaMedica = recetaMedicaRepository.listAll();
        Collection<RecetaMedicaResponseDto> dtos = new ArrayList<>();

        for (RecetaMedica m : RecetaMedica) {
            dtos.add(recetaMedicaFactory.createResponseFromEntity(m));
        }

        if (dtos.isEmpty()) {
            throw new EmptyTableException("No hay registros de RecetaMedica");
        }

        return dtos;
    }
    
    @Transactional
    public Collection<RecetaMedicaResponseDto> persistRecetaMedica(List<RecetaMedicaRequestDto> dtos) {
        // Agregar validaciones si es necesario
        Collection<RecetaMedicaResponseDto> response = new ArrayList<>();
        for (RecetaMedicaRequestDto dto : dtos) {
            RecetaMedica recetaMedica = recetaMedicaFactory.createEntityFromDto(dto);
            Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByCodigo(recetaMedica.getCodigo());
			if(optionalRecetaMedica.isPresent()) {
				throw new RuntimeException("Esta receta ya existe en el turno");
			}
            this.recetaMedicaRepository.persist(recetaMedica);
            this.medicamentoService.persistMedicamento(recetaMedica.getCodigo(), dto.getMedicamentos());
            response.add(recetaMedicaFactory.createResponseFromEntity(recetaMedica));
        }
        
        return response;
    }
    
    @Transactional
    public void updateRecetaMedica(String codigo, RecetaMedicaRequestDto dto) {
        Optional<RecetaMedica> optionalRecetaMedica = recetaMedicaRepository.findByCodigo(codigo);
        if (optionalRecetaMedica.isPresent()) {
            RecetaMedica recetaMedica = optionalRecetaMedica.get();
            recetaMedica.setId(optionalRecetaMedica.get().getId());
            recetaMedica.setUltimaModificacion(LocalDate.now());
            recetaMedica.setCantDiasVigencia(dto.getCantDiasVigencia());
            /*try {
                //BeanUtils.copyProperties(recetaMedica, dto);
                
                

            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException("Error al copiar propiedades", e);
            }*/
            
            //return this.recetaMedicaFactory.createResponseFromEntity(recetaMedica);
        } else {
            throw new RecetaMedicaNotFoundException("RecetaMedica no encontrado");
        }
    }
    
    @Transactional
    public void deleteRecetaMedica(String codigo) {
        int updatedRows = this.recetaMedicaRepository.update("estaEliminado = true WHERE codigo = ?1", codigo);
        if (updatedRows == 0) {
            throw new RecetaMedicaNotFoundException("RecetaMedica no encontrado");
        }
    }

}
