package org.softek.g5.exceptions.entitiesCustomException;

public class UbicacionNotFoundException extends RuntimeException {

    public UbicacionNotFoundException() {
        super("Ubicación no encontrada");
    }

    public UbicacionNotFoundException(String message) {
        super(message);
    }

    public UbicacionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UbicacionNotFoundException(Throwable cause) {
        super(cause);
    }
}