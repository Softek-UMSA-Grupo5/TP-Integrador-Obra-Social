package org.softek.g5.exceptions;

public class InvalidDataRequest extends RuntimeException{

	public InvalidDataRequest() {
        super();
    }

    public InvalidDataRequest(String message) {
        super(message);
    }

    public InvalidDataRequest(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidDataRequest(Throwable cause) {
        super(cause);
    }
	
}
