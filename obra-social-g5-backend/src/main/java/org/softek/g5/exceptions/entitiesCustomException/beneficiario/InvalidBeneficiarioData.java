package org.softek.g5.exceptions.entitiesCustomException.beneficiario;

public class InvalidBeneficiarioData extends RuntimeException{
	public InvalidBeneficiarioData() {
        super();
    }

    public InvalidBeneficiarioData(String message) {
        super(message);
    }

    public InvalidBeneficiarioData(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidBeneficiarioData(Throwable cause) {
        super(cause);
    }
}
