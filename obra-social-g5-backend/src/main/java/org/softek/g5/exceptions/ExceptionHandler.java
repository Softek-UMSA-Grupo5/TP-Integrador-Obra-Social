package org.softek.g5.exceptions;

import org.jboss.resteasy.reactive.server.ServerExceptionMapper;
import org.softek.g5.exceptions.CustomException.*;

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
	            "Error: no se pudo encontrar la/s entidad/es",
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
	            "Error: Los datos enviados no son correctos",
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

	@ServerExceptionMapper
	public Response handleHorarioSuperpuestoException(HorarioSuperpuestoException exception) {
		errorResponse = new ErrorResponse(
				Response.Status.CONFLICT.getStatusCode(),
				"Error: Horario superpuesto",
				exception.getMessage()
		);

		return Response.status(Response.Status.CONFLICT)
				.entity(errorResponse)
				.build();
	}


	
	@ServerExceptionMapper
	public Response handleEntityExistException(EntityExistException exception) {
		errorResponse = new ErrorResponse(
	            Response.Status.CONFLICT.getStatusCode(),
	            "Error: la entidad ya existe",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
}
