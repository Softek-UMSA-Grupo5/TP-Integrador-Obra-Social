// src/App.tsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import ConsultoriosList from './component/ConsultorioForm';
import Login from './component/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div>
        <Login />
        <ConsultoriosList/>
      </div>
    </AuthProvider>
  );
}

export default App;
