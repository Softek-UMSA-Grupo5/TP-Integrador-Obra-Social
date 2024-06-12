package org.softek.g5.exceptions.handlers;

import org.softek.g5.exceptions.ErrorResponse;
import org.softek.g5.exceptions.InvalidDataRequest;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class InvalidDataRequestHandler implements ExceptionMapper<InvalidDataRequest>{

	@Override
	public Response toResponse(InvalidDataRequest exception) {
		ErrorResponse errorResponse = new ErrorResponse(
	            Response.Status.BAD_REQUEST.getStatusCode(),
	            "Error: algún campo/atributo de la Request enviada no tiene el tipo de dato correcto",
	            exception.getMessage()
	        );

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(errorResponse)
	                .build();
	}
	
}
