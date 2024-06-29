import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const CustomTextField: React.FC<TextFieldProps> = (props) => {
    return (
        <TextField
            {...props}
            InputLabelProps={{
                shrink: true,
                sx: {
                    transform: 'translate(14px, 10px) scale(1)', // Ajusta según sea necesario
                },
            }}
            InputProps={{
                sx: {
                    height: '40px', // Altura del input
                    padding: '0 14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                },
            }}
        />
    );
};

export default CustomTextField;
