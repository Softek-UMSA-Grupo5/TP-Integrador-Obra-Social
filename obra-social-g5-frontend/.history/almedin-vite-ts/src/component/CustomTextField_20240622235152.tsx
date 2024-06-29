import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const CustomTextField: React.FC<TextFieldProps> = (props) => {
    return (
        <TextField
            {...props}
            InputLabelProps={{
                shrink: props.value ? true : false, // Ajusta según si hay valor en el input
                sx: (theme) => ({
                    ...(props.value && {
                        transform: 'translate(14px, -6px) scale(0.75)', // Ajusta según sea necesario
                        backgroundColor: theme.palette.background.paper, // Fondo blanco para evitar solapamiento con el input
                        padding: '0 4px', // Padding para que el fondo blanco se vea mejor
                    }),
                    '&.Mui-focused': {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        backgroundColor: theme.palette.background.paper,
                        padding: '0 4px',
                    },
                }),
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
