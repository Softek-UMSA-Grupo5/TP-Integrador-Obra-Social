import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ConsultoriosList from './component/ConsultorioForm';
import Login from './component/Login';
import './App.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<PrivateRoute> <ConsultoriosList /> </PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
