import ConsultorioForm from "../components/crearConsultorio/CrearConsultorio"
import LandingPage from '../layouts/LandingPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLogin from '../components/userLogin/UserLogin';
import CrearTurnoMedico from "../components/crearTurnoMedico/CrearTurnoMedico";
import ResponsiveMain from "../components/landingPage/ResponsiveMain";
import UpdatePassword from "../components/userLogin/UpdatePassword";
import ForgotPassword from "../components/userLogin/ForgotPassword";
import ListaTurnosSocio from "../components/listaTurnosSocio/ListaTurnosSocio";
import AñadirSocio from "../components/socio/AñadirSocio";
import AgregarMedicoFormulario from "../components/crearMedico/CrearMedico";
import MedicosList from "../components/editarMedicos/Medicos";
import UsuarioForm from "../layouts/CrearUsuario";

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
            },
           
            {
                path: '/turnos',
                element: <ListaTurnosSocio />,
            },
            {
                path: '/funcionarios',
                element: <UsuarioForm />,
            },
            {
                path: '/socio',
                element: <AñadirSocio />,
            },
            {
                path:'/medicos',
                element: <AgregarMedicoFormulario />,
            },
            {
                path: '/listamedicos',
                element: <MedicosList />,
            }
        ],
    },
    {
        path: '/login',
        element: <UserLogin />,
    },
    {
        path: '/usuarios/actualizarcontraseña',
        element: <UpdatePassword />,
    },
    {
        path: '/forgotpassword',
        element: <ForgotPassword />,
    },
    
]);


export const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}