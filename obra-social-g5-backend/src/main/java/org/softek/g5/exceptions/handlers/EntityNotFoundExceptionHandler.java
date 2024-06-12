package org.softek.g5.exceptions.handlers;

import org.softek.g5.exceptions.EntityNotFoundException;
import org.softek.g5.exceptions.ErrorResponse;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class EntityNotFoundExceptionHandler implements ExceptionMapper<EntityNotFoundException>{

	@Override
	public Response toResponse(EntityNotFoundException exception) {
		ErrorResponse errorResponse = new ErrorResponse(
	            Response.Status.NOT_FOUND.getStatusCode(),
	            "Error interno del servidor al buscar una entidad",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}

}
