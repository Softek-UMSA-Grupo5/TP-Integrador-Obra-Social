import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SeccionTitulo from './SeccionTitulo';
import SeccionSobreNosotros from './SeccionSobreNosotros';
import SeccionServicios from './SeccionServicios';
import SeccionTestimonios from './SeccionTestimonios';
import { useUser } from '../../assets/contexts/UserContext';
import SeccionBienvenida from './SeccionBienvenida';
import React from 'react';
import { SocioResponse } from '../../assets/models/Socio';
import { getUserInfo } from '../../assets/axios/UsuarioApi';
import { MedicoResponseDto } from '../../assets/models/Medico';

const ResponsiveMain = () => {
    const { user } = useUser();
    const [usuario, setUsuario] = React.useState<SocioResponse | MedicoResponseDto>();

    React.useEffect(() => {
        if (user) {
            if (user.rol != 'ROL_ADMIN') {
                getUserInfo(user).then((response) => setUsuario(response));
                return;
            }
        }
    }, []);

    return (
        <>
            {!user ? (
                <Box
                    sx={{
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
            ) : (
                <Box
                    sx={{
                        backgroundImage: 'url(/hero-bg.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        py: 15,
                        color: 'black',
                        textAlign: 'center',
                    }}>
                    <SeccionBienvenida nombre={usuario?.nombre} apellido={usuario?.apellido} />
                </Box>
            )}
        </>
    );
};

export default ResponsiveMain;
