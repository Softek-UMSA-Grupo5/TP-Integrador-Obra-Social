import { Box, Typography } from '@mui/material';

const ResponsiveFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#1976d2',
                color: 'white',
                textAlign: 'center',
            }}>
            <Typography variant="body1">&copy; 2024 Almedin. Todos los derechos reservados.</Typography>
        </Box>
    );
};

export default ResponsiveFooter;
