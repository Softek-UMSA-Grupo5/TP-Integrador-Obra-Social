import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ConsultoriosList from './component/ConsultorioForm';
import Login from './component/Login';
import './App.css';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { token } = useAuth();
  return token ? <Component /> : <Navigate to="/login" />;
};

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
