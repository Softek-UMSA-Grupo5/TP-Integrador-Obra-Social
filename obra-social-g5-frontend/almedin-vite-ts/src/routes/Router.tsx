import ConsultorioForm from "../components/crearConsultorio/CrearConsultorio"
import UsuarioForm from "../components/crearUsuario/CrearUsuario"
import LandingPage from '../components/landingPage/LandingPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLogin from '../components/userLogin/UserLogin';
import CrearTurnoMedico from "../components/crearTurnoMedico/CrearTurnoMedico";
import ResponsiveMain from "../components/landingPage/ResponsiveMain";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        children: [
            {
                path: '/crearturnomedico',
                element: <CrearTurnoMedico />,
            },
            {
                path: '/',
                element: <ResponsiveMain />,
            },
            {
                path: '/consultorios',
                element: <ConsultorioForm />,
            }
        ],
    },
    {
        path: '/login',
        element: <UserLogin />,
    },
    
]);


export const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}