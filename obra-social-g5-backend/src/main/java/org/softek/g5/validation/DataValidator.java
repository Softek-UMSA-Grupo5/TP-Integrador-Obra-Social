package org.softek.g5.validation;

import java.util.function.Predicate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataValidator<T> {

	private T value;
    private Predicate<T> validator;
	
    public boolean isValid() {
        return validator.test(value);
    }
    
	public static <T> boolean validate(T value, Predicate<T> validator) {
        return validator.test(value);
    }

    // Static methods for common validations
    public static boolean validateString(String value, int minLength, int maxLength) {
        return validate(value, v -> v != null && v.length() >= minLength && v.length() <= maxLength);
    }

    public static boolean validateInteger(Integer value, int minValue, int maxValue) {
        return validate(value, v -> v != null && v >= minValue && v <= maxValue);
    }
    
    public static boolean validateLong(Long value, Long minValue, Long maxValue) {
        return validate(value, v -> v != null && v >= minValue && v <= maxValue);
    }

    public static boolean validateDouble(Double value, double minValue, double maxValue) {
        return validate(value, v -> v != null && v >= minValue && v <= maxValue);
    }
    
    public static boolean validateBoolean(Boolean value) {
    	return validate(value, v -> v != null && (v == true || v == false));
    }
	
}
