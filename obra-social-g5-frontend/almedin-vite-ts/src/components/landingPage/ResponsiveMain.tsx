import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SeccionTitulo from './SeccionTitulo';
import SeccionSobreNosotros from './SeccionSobreNosotros';
import SeccionServicios from './SeccionServicios';
import SeccionTestimonios from './SeccionTestimonios';

const ResponsiveMain = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/hero-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: 15,
                color: 'black',
                textAlign: 'center',
            }}>
            <SeccionTitulo/>
            <SeccionSobreNosotros/>
            <SeccionServicios/>
            <SeccionTestimonios/>
            <ContactForm/>
        </Box>
    );
};

export default ResponsiveMain;
