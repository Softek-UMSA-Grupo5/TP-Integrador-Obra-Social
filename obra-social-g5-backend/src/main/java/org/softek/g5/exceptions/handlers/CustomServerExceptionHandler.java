package org.softek.g5.exceptions.handlers;

import org.softek.g5.exceptions.CustomServerException;
import org.softek.g5.exceptions.ErrorResponse;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class CustomServerExceptionHandler implements ExceptionMapper<CustomServerException>{

	@Override
	public Response toResponse(CustomServerException exception) {
		ErrorResponse errorResponse = new ErrorResponse(
	            Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
	            "Error interno del servidor",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}

}
