package org.softek.g5.exceptions.entitiesCustomException.horario;

public class HorarioSuperpuestoException extends RuntimeException{
	public HorarioSuperpuestoException() {
        super();
    }

    public HorarioSuperpuestoException(String message) {
        super(message);
    }

    public HorarioSuperpuestoException(String message, Throwable cause) {
        super(message, cause);
    }

    public HorarioSuperpuestoException(Throwable cause) {
        super(cause);
    }

    protected HorarioSuperpuestoException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
