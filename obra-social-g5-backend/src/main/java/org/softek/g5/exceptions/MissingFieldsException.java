package org.softek.g5.exceptions;

public class MissingFieldsException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MissingFieldsException() {
        super();
    }

    public MissingFieldsException(String message) {
        super(message);
    }

    public MissingFieldsException(String message, Throwable cause) {
        super(message, cause);
    }

    public MissingFieldsException(Throwable cause) {
        super(cause);
    }
	
}
