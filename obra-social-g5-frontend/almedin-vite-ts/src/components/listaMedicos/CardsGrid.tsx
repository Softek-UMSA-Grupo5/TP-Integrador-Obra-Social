import { Container, Grid } from '@mui/material'
import MedicoCard from './MedicoCard';
import { MedicoResponseDto } from '../../assets/models/Medico';
import { ConsultorioResponseDto } from '../../assets/models/Consultorio';

interface MedicosExistentesProps {
    existingMedicos: MedicoResponseDto[];
    existingConsultorios: ConsultorioResponseDto[];
}

const CardsGrid: React.FC<MedicosExistentesProps> = ({ existingMedicos, existingConsultorios }) => {
    return(
        <Container sx={{ marginBottom: '40px' }}>
            <Grid container spacing={2}>
                <MedicoCard existingMedicos={existingMedicos} existingConsultorios={existingConsultorios} />
            </Grid>
        </Container>
    );
}

export default CardsGrid;