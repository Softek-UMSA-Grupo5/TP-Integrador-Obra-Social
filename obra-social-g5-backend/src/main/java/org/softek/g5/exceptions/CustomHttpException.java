package org.softek.g5.exceptions;

public class CustomHttpException extends RuntimeException{

	private int httpStatusCode;

    public CustomHttpException(String message, int httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }
	
}
