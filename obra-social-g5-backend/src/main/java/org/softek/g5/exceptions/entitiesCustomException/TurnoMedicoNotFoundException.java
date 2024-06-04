package org.softek.g5.exceptions.entitiesCustomException;

public class TurnoMedicoNotFoundException extends RuntimeException{

	public TurnoMedicoNotFoundException() {
        super();
    }

    public TurnoMedicoNotFoundException(String message) {
        super(message);
    }

    public TurnoMedicoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TurnoMedicoNotFoundException(Throwable cause) {
        super(cause);
    }
	
}
