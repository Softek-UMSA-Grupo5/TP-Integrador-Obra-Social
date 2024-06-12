package org.softek.g5.exceptions;

import org.jboss.resteasy.reactive.server.ServerExceptionMapper;
import org.softek.g5.exceptions.CustomException.CustomServerException;
import org.softek.g5.exceptions.CustomException.EntityNotFoundException;
import org.softek.g5.exceptions.CustomException.InvalidDataRequest;
import org.softek.g5.exceptions.CustomException.MissingFieldsException;

import jakarta.ws.rs.core.Response;

public class ExceptionHandler {

	private ErrorResponse errorResponse;
	
	@ServerExceptionMapper
	public Response handleCustomServerException(CustomServerException exception) {
		errorResponse = new ErrorResponse(
	            Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
	            "Error interno del servidor",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
	@ServerExceptionMapper
	public Response handleEntityNotFoundException(EntityNotFoundException exception) {
		errorResponse = new ErrorResponse(
	            Response.Status.NOT_FOUND.getStatusCode(),
	            "Error interno del servidor al buscar una entidad",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
	@ServerExceptionMapper
	public Response handleInvalidDataRequest(InvalidDataRequest exception) {
		errorResponse = new ErrorResponse(
	            Response.Status.BAD_REQUEST.getStatusCode(),
	            "Error: algún campo/atributo de la Request enviada no tiene el tipo de dato correcto",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
	@ServerExceptionMapper
	public Response handleMissingFieldsException(MissingFieldsException exception) {
		errorResponse = new ErrorResponse(
	            Response.Status.BAD_REQUEST.getStatusCode(),
	            "Error: hay campos que no pueden ser nulos",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
}
