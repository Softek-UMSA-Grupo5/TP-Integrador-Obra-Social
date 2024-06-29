import { Container, Typography } from "@mui/material";
import { useUser } from "../../assets/contexts/UserContext";

export default function SeccionBienvenida(){

const {user} = useUser();

    return(
        <Container maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    Bienvenido {user?.username}
                </Typography>
                <Typography variant="h5" paragraph>
                    Tu salud es nuestra prioridad, juntos construimos un futuro más saludable y
                    seguro
                </Typography>
            </Container>
    )
}