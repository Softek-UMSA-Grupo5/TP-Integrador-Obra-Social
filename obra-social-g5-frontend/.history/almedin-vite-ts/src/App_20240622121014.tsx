import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ConsultoriosList from './component/ConsultorioForm'; // Asegúrate de importar el componente correcto
import Login from './component/Login';
import './App.css';
import PrivateRoute from './component/PrivateRoute'; // Asegúrate de importar el componente PrivateRoute si lo tienes

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/consultorios" element={<PrivateRoute component={ConsultoriosList} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

