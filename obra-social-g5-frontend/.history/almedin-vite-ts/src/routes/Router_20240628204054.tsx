import { Route, Routes } from "react-router-dom"
import ConsultorioForm from "../components/crearConsultorio/CrearConsultorio"
import UsuarioForm from "../components/crearUsuario/CrearUsuario"

export const Router = () => {
    return (
        <Routes>
            <Route path="/consultorio" element={<ConsultorioForm/>}></Route>
            <Route path="/usuarios" element={<UsuarioForm/>}></Route>
        </Routes>
    )
}