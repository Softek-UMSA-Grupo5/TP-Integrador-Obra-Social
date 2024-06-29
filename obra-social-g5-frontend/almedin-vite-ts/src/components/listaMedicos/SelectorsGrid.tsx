import { Container, Grid, TextField } from "@mui/material";
import EspecialidadSelect from "./EspecialidadSelector";
import UbicacionSelect from "./UbicacionSelector";

export default function SelectorsGrid(){
    return(
        <Container sx={{ paddingBottom:"2rem" }}>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <EspecialidadSelect />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <UbicacionSelect />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <TextField fullWidth id="outlined-basic" label="Buscar por nombre..." variant="outlined" />
                </Grid>
            </Grid>
        </Container>
    );
}