package org.softek.g5.exceptions.entitiesCustomException.beneficiario;

public class BeneficiarioNotFoundException extends RuntimeException{
	public BeneficiarioNotFoundException() {
        super();
    }

    public BeneficiarioNotFoundException(String message) {
        super(message);
    }

    public BeneficiarioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BeneficiarioNotFoundException(Throwable cause) {
        super(cause);
    }
}
