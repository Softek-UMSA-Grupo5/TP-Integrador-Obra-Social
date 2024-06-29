import { Route, Routes } from "react-router-dom"
import ConsultorioForm from "../components/Consultorio/CrearConsultorio"
import UsuarioForm from "../components/Usuario/UsuarioForm"

export const Router = () => {
    return (
        <Routes>
            <Route path="/Consultorio" element={<ConsultorioForm/>}></Route>
            <Route path="/Consultorio" element={<UsuarioForm/>}></Route>
        </Routes>
    )
}