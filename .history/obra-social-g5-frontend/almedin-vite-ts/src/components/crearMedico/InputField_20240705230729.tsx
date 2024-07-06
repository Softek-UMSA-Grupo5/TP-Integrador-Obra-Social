import React from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';

interface InputFieldProps {
    name: string;
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    type?: string;
    inputProps?: object;
    required?: boolean;
    placeholder?: string;
}
const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    value,
    onChange,
    onBlur,
    error = false,
    helperText,
    type = 'text',
    inputProps,
    required = false,
    placeholder,
}) => {
    return (
        <FormControl fullWidth variant="outlined" sx={{ my: 0.5 }}>
            <InputLabel sx={{ fontSize: '16px' }} shrink>{label}</InputLabel>
            <OutlinedInput
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                sx={{ my: 1.5, maxHeight: 40 }}
                placeholder={placeholder ?? label}
                required={required}
                error={error}
                inputProps={inputProps}
                
            />
            <FormHelperText sx={{ position: 'absolute', bottom: '-10px' }} error>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

export default InputField;
