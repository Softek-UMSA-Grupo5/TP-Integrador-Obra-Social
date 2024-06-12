package org.softek.g5.exceptions.handlers;

import org.softek.g5.exceptions.ErrorResponse;
import org.softek.g5.exceptions.MissingFieldsException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class MissingFieldsExceptionHandler implements ExceptionMapper<MissingFieldsException>{

	@Override
	public Response toResponse(MissingFieldsException exception) {
		ErrorResponse errorResponse = new ErrorResponse(
	            Response.Status.BAD_REQUEST.getStatusCode(),
	            "Error: hay campos que no pueden ser nulos",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
}
