import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ContactForm = () => {
    return (
        <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom align="center">
                    Ponerse en contacto
                </Typography>
                <Typography variant="body1" paragraph align="center">
                    ¿Tiene alguna pregunta o desea obtener más información sobre cómo ser parte de Almedin y conocer nuestros planes? Complete el siguiente formulario y nos comunicaremos con usted
                    lo antes posible.
                </Typography>
                <Box
                    component="form"
                    sx={{
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <TextField label="Nombre" fullWidth margin="normal" required />
                    <TextField label="Email" type="email" fullWidth margin="normal" required />
                    <TextField
                        label="Mensaje"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                        Enviar
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ContactForm;
