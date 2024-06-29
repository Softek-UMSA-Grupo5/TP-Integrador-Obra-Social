import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SeccionTitulo from './SeccionTitulo';
import SeccionSobreNosotros from './SeccionSobreNosotros';
import SeccionServicios from './SeccionServicios';
import SeccionTestimonios from './SeccionTestimonios';
import { useUser } from '../../assets/contexts/UserContext';
import SeccionBienvenida from './SeccionBienvenida';

const ResponsiveMain = () => {
    const { user } = useUser();

    return (
        <>
            {!user && (
                <Box
                    sx={{
                        backgroundImage: 'url(/hero-bg.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        py: 15,
                        color: 'black',
                        textAlign: 'center',
                    }}>
                    <SeccionTitulo />
                    <SeccionSobreNosotros />
                    <SeccionServicios />
                    <SeccionTestimonios />
                    <ContactForm />
                </Box>
            )}
            { user && (
                <Box
                sx={{
                    backgroundImage: 'url(/hero-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    py: 15,
                    color: 'black',
                    textAlign: 'center',
                }}>
                <SeccionBienvenida />
            </Box>
            )

            }
        </>
    );
};

export default ResponsiveMain;
