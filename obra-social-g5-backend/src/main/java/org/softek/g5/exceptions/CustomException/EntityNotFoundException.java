package org.softek.g5.exceptions.CustomException;

public class EntityNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EntityNotFoundException() {
        super("Error: tabla vacía");
    }

    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public EntityNotFoundException(Throwable cause) {
        super(cause);
    }
	
}
