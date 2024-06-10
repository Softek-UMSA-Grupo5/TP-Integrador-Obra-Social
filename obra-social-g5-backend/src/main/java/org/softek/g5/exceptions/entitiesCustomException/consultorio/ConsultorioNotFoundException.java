package org.softek.g5.exceptions.entitiesCustomException.consultorio;

public class ConsultorioNotFoundException extends RuntimeException{
	public ConsultorioNotFoundException() {
        super("Ubicación no encontrada");
    }

    public ConsultorioNotFoundException(String message) {
        super(message);
    }

    public ConsultorioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ConsultorioNotFoundException(Throwable cause) {
        super(cause);
    }
}
