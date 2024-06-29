import { Container, Grid } from '@mui/material'
import MedicoCard from './MedicoCard';

export default function CardsGrid(){
    return(
        <Container>
            <Grid container spacing={2}>
                <MedicoCard />
            </Grid>
        </Container>
    );
}