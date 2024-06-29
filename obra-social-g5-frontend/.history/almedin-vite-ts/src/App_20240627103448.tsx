import React from 'react';
import ConsultorioForm from './components/Consultorio/CrearConsultorio';
import UsuarioForm from './components/Usuario/UsuarioForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header"> 
      </header>
      <main>
        <ConsultorioForm /> 
        <UsuarioForm/>
      </main>
    </div>
  );
};


export default App;
