package org.softek.g5.exceptions.entitiesCustomException.medicamento;

public class InvalidMedicamentoData extends RuntimeException{

	public InvalidMedicamentoData() {
        super();
    }

    public InvalidMedicamentoData(String message) {
        super(message);
    }

    public InvalidMedicamentoData(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidMedicamentoData(Throwable cause) {
        super(cause);
    }
	
}
