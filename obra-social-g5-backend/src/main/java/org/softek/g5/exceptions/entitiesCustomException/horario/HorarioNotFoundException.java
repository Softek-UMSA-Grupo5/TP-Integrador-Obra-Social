package org.softek.g5.exceptions.entitiesCustomException.horario;


public class HorarioNotFoundException extends RuntimeException {

    public HorarioNotFoundException() {
        super("Horario no encontrado");
    }

    public HorarioNotFoundException(String message) {
        super(message);
    }

    public HorarioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public HorarioNotFoundException(Throwable cause) {
        super(cause);
    }
}