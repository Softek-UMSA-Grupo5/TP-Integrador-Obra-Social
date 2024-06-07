package org.softek.g5.exceptions.entitiesCustomException;

public class RecetaMedicaNotFoundException extends RuntimeException{

	public RecetaMedicaNotFoundException() {
        super();
    }

    public RecetaMedicaNotFoundException(String message) {
        super(message);
    }

    public RecetaMedicaNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecetaMedicaNotFoundException(Throwable cause) {
        super(cause);
    }
	
}
