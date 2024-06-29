import { Route, Routes } from "react-router-dom"
import ConsultorioForm from "../components/Consultorio/CrearConsultorio"

const Router = () => {
    return (
        <Routes>
            <Route path="/Consultorio" element={<ConsultorioForm/>}></Route>
        </Routes>
    )
}