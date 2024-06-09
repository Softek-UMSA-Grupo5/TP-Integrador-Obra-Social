package org.softek.g5.exceptions.entitiesCustomException.socio;

public class InvalidSocioData extends RuntimeException{
	public InvalidSocioData() {
        super();
    }

    public InvalidSocioData(String message) {
        super(message);
    }

    public InvalidSocioData(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidSocioData(Throwable cause) {
        super(cause);
    }
}
