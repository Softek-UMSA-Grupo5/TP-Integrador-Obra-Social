import React from 'react'
import ReactDOM from 'react-dom/client'
import AñadirSocio from './components/añadirSocio/AñadirSocio'
//import App from './App.tsx'
import CrearTurnoMedico from './components/crearTurnoMedico/CrearTurnoMedico.tsx'
//import './index.css'
import LandingPage from './components/landingPage/LandingPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserLogin from './components/userLogin/UserLogin';
//import ResponsiveAppBar from './components/landingPage/ResponsiveAppBar'
//import ResponsiveMain from './components/landingPage/ResponsiveMain'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/",
    element: <LandingPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CrearTurnoMedico />
    
    {/* <ResponsiveAppBar /> */}
    {/* <ResponsiveMain/> */}
    {/* <UserLogin /> */}
    {/* <AñadirSocio /> */}
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)