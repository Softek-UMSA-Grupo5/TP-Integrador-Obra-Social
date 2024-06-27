import { Avatar, Box, Container, Grid, Paper, Typography } from "@mui/material";

const SeccionTestimonios = () => {
    return(
        <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Escuche a nuestros beneficiarios
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="body1" paragraph>
                            "Almedin ha sido un salvavidas para mi familia. La atención domicilaria y los servicios de atención médica que brindaron han marcado una enorme diferencia en nuestras vidas".
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src="/placeholder-user.jpg" />
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Rosa Ana
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Beneficiaria
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="body1" paragraph>
                            "Estoy agradecido por los planes de beneficios que Almedin me ha brindado. Me han permitido realizarme estudios sin un gran costo monetario".
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src="/placeholder-user.jpg" />
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Rodrigo Gimenez
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Beneficiario
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="body1" paragraph>
                                "Alemdin cuenta con la última tecnología en estudios clínicos. Sus especialistas son muy buenos tratando con sus pacientes"
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src="/placeholder-user.jpg" />
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Delfina Chacón
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Beneficiario
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
    )
}

export default SeccionTestimonios;