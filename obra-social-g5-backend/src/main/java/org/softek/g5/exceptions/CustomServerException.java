package org.softek.g5.exceptions;

import java.io.Serializable;

public class CustomServerException extends RuntimeException implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CustomServerException() {
        super("Error por parte del servidor");
    }

    public CustomServerException(String message) {
        super(message);
    }

    public CustomServerException(String message, Throwable cause) {
        super(message, cause);
    }

    public CustomServerException(Throwable cause) {
        super(cause);
    }
	
}
