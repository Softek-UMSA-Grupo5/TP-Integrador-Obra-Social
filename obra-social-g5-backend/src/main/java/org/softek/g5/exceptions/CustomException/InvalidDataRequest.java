package org.softek.g5.exceptions.CustomException;

public class InvalidDataRequest extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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
