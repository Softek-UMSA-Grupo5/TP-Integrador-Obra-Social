import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';

export default function SeccionTestimonios() {
    return (
        <Container id="testimonios" maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom align="center">
                Escuche a nuestros beneficiarios
            </Typography>
            <Grid container spacing={4}>
                {testimonios.map((testimonio, index) => (
                    <Testimonio key={index} testimonio={testimonio.testimonio} persona={testimonio.persona} />
                ))}
            </Grid>
        </Container>
    );
}

interface Testimonio {
    testimonio: string;
    persona: string;
}

const Testimonio: React.FC<Testimonio> = ({ testimonio, persona }) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="body1" paragraph>
                        {testimonio}{' '}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src="/placeholder-user.jpg" />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {persona}{' '}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Beneficiario
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
};

const testimonios = [
    {
        testimonio:
            '"Almedin ha sido un salvavidas para mi familia. La atención domicilaria y los servicios de atención médica que brindaron han marcado una enorme diferencia en nuestras vidas".',
        persona: 'Rosa Ana',
    },
    {
        testimonio:
            '"Estoy agradecido por los planes de beneficios que Almedin me ha brindado. Me han permitido realizarme estudios sin un gran costo monetario".',
        persona: 'Rodrigo Gimenez',
    },
    {
        testimonio:
            '"Alemdin cuenta con la última tecnología en estudios clínicos. Sus especialistas son muy buenos tratando con sus pacientes".',
        persona: 'Delfina Chacón',
    },
];
