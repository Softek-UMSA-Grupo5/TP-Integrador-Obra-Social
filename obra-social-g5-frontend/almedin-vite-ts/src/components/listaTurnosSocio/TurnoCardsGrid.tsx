import { Container, Grid } from '@mui/material'
import TurnoCard from './TurnoCard';

export default function TurnoCardsGrid(){
    return(
        <Container sx={{ marginBottom: '40px' }}>
            <Grid container spacing={2}>        
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TurnoCard />
                </Grid>
            </Grid>
        </Container>
    );
}