package org.softek.g5.exceptions.entitiesCustomException;

public class MedicoNotFoundException extends RuntimeException{
	public MedicoNotFoundException() {
        super("Ubicación no encontrada");
    }

    public MedicoNotFoundException(String message) {
        super(message);
    }

    public MedicoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MedicoNotFoundException(Throwable cause) {
        super(cause);
    }
	
}
