package org.softek.g5.exceptions.entitiesCustomException.medico;

public class MedicoNotFoundException extends RuntimeException{
	public MedicoNotFoundException() {
        super();
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
