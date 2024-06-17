package org.softek.g5.exceptions.CustomException;

public class HorarioSuperpuestoException extends RuntimeException{

    /**
     *
     */
    private static final long serialVersionUID = 1L;
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
