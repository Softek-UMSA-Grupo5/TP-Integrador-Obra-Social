package org.softek.g5.services;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.apache.commons.beanutils.BeanUtils;
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
            RecetaMedica RecetaMedica = recetaMedicaFactory.createEntityFromDto(dto);
            this.recetaMedicaRepository.persist(RecetaMedica);
            response.add(recetaMedicaFactory.createResponseFromEntity(RecetaMedica));
        }
        
        return response;
    }
    
    @Transactional
    public RecetaMedicaResponseDto updateRecetaMedica(Long id, RecetaMedicaRequestDto dto) {
        Optional<RecetaMedica> optionalRecetaMedica = Optional.of(recetaMedicaRepository.findById(id));
        if (optionalRecetaMedica.isPresent()) {
            RecetaMedica RecetaMedica = optionalRecetaMedica.get();
            
            try {
                // Copiar propiedades del DTO a la entidad, excluyendo id y recetaMedica
                BeanUtils.copyProperties(RecetaMedica, dto);
                
                // Reasignar manualmente el ID y la receta médica para evitar cambios no deseados
                RecetaMedica.setId(optionalRecetaMedica.get().getId());

                // No es necesario llamar a persist, ya que Panache sincroniza automáticamente
            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException("Error al copiar propiedades", e);
            }
            
            return this.recetaMedicaFactory.createResponseFromEntity(RecetaMedica);
        } else {
            throw new RecetaMedicaNotFoundException("RecetaMedica no encontrado");
        }
    }
    
    @Transactional
    public void deleteRecetaMedica(Long id) {
        int updatedRows = this.recetaMedicaRepository.update("estaEliminado = true WHERE id = ?1", id);
        if (updatedRows == 0) {
            throw new RecetaMedicaNotFoundException("RecetaMedica no encontrado");
        }
    }

}
