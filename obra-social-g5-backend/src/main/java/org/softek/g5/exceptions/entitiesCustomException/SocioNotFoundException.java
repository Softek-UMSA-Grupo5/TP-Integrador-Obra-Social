package org.softek.g5.exceptions.entitiesCustomException;

public class SocioNotFoundException extends RuntimeException{
	public SocioNotFoundException() {
        super();
    }

    public SocioNotFoundException(String message) {
        super(message);
    }

    public SocioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SocioNotFoundException(Throwable cause) {
        super(cause);
    }
}
