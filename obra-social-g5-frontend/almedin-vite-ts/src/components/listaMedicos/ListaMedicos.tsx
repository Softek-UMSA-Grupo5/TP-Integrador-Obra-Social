import { Container } from "@mui/material";
import SelectorsGrid from "./SelectorsGrid";
import CardsGrid from "./CardsGrid";

function ListaMedicos() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Lista de Médicos</h1>
            <SelectorsGrid />
            <CardsGrid />
        </Container>
    );
}

export default ListaMedicos;