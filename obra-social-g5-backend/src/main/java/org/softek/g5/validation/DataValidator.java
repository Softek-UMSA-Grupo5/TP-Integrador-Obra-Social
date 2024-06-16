package org.softek.g5.validation;


import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;

import org.softek.g5.exceptions.CustomException.MissingFieldsException;

import jakarta.validation.constraints.NotNull;
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
    

    public static boolean ValidateDate(Date date) {
        if (date == null) {
            return false;
        }
        Calendar minDate = Calendar.getInstance();
        minDate.set(1915, Calendar.JANUARY, 1, 0, 0, 0);
        Calendar maxDate = Calendar.getInstance();
        if (date.before(minDate.getTime()) || date.after(maxDate.getTime())) {
            return false;
        }
        return true;
    }
    
    public static boolean validateFields(Boolean value) {
    	return validate(value, v -> v != null && (v == true || v == false));
    }

    public static boolean validateDate(LocalDate date) {
        return validate(date, d -> d != null && !d.isBefore(LocalDate.now()));

    }
    
    public static <T> void validateDtoFields(T dto) {
        List<String> missingFields = new ArrayList<>();
        Field[] fields = dto.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(NotNull.class)) {
                field.setAccessible(true);
                try {
                    Object value = field.get(dto);
                    if (value == null) {
                        missingFields.add(field.getName());
                    }
                } catch (IllegalAccessException e) {
                    throw new RuntimeException("Error al acceder al campo: " + field.getName(), e);
                }
            }
        }

        if (!missingFields.isEmpty()) {
            throw new MissingFieldsException("Los siguientes campos son obligatorios y no están presentes: " + missingFields);
        }
    }
	
}
