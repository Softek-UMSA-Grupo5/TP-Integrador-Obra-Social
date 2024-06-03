package org.softek.g5.exceptions;

public class EmptyTableException extends RuntimeException{

	public EmptyTableException() {
        super();
    }

    public EmptyTableException(String message) {
        super(message);
    }

    public EmptyTableException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmptyTableException(Throwable cause) {
        super(cause);
    }
	
}
