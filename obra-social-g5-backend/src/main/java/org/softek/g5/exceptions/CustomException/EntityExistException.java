package org.softek.g5.exceptions.CustomException;

public class EntityExistException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public EntityExistException() {
        super("La entidad ya existe");
    }

    public EntityExistException(String message) {
        super(message);
    }

    public EntityExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public EntityExistException(Throwable cause) {
        super(cause);
    }
	
}
