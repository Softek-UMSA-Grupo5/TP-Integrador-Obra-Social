package org.softek.g5.exceptions.entitiesCustomException;

public class MedicamentoNotFoundException extends RuntimeException{

	public MedicamentoNotFoundException() {
        super();
    }

    public MedicamentoNotFoundException(String message) {
        super(message);
    }

    public MedicamentoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MedicamentoNotFoundException(Throwable cause) {
        super(cause);
    }
	
}
