import { Container, Grid, SelectChangeEvent } from "@mui/material";
import EspecialidadSelect from "./EspecialidadSelector";

interface props {
    especialidad: string;
    handleSetEspecialidad: (event: SelectChangeEvent<string>) => void;
}

export default function SelectorsGrid({ especialidad, handleSetEspecialidad }: props){

    return(
        <Container sx={{ paddingBottom:"2rem" }}>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <EspecialidadSelect especialidad={especialidad} handleSetEspecialidad={handleSetEspecialidad}/>
                </Grid>
            </Grid>
        </Container>
    );
}