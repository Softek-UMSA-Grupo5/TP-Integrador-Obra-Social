import { Box, Button, Container, Typography } from "@mui/material";
import SocioForm from "./SocioForm";

const EditarSocio =() => {

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ bgcolor: 'background.paper', p: 6, boxShadow: 3, borderRadius: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: 2,
                        borderColor: 'gray.200',
                        pb: 4,
                    }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            textAlign: { xs: 'center', sm: 'left' },
                        }}>
                        Almedin
                    </Typography>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                            Editar registro de Socio
                        </Typography>
                    </Box>
                </Box>

                <SocioForm />

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary">
                        Actualizar
                    </Button>
                    <Button variant="contained" color="primary">
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditarSocio;
