package org.softek.g5.exceptions.entitiesCustomException.medico;

public class InvalidMedicoData extends RuntimeException{
	public InvalidMedicoData() {
        super();
    }

    public InvalidMedicoData(String message) {
        super(message);
    }

    public InvalidMedicoData(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidMedicoData(Throwable cause) {
        super(cause);
    }
}
