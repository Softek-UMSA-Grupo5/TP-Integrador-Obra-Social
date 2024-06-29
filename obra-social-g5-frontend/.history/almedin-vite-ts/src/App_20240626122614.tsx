import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConsultorioPage from './pages/ConsultorioPage';
// Otros imports necesarios

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
               {/*  <Route path="/" element={<Home />} /> */}
                <Route path="/consultorios" element={<ConsultorioPage />} />
                {/* Otras rutas según sea necesario */}
            </Routes>
        </Router>
    );
};

export default App;
