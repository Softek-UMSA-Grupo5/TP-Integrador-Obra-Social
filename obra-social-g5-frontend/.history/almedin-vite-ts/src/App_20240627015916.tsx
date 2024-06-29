import React from 'react';
/* import ConsultorioForm from './components/Consultorio/CrearConsultorio'; */
import UsuarioForm from './components/Usuario/UsuarioForm';

const App: React.FC = () => {
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <header className="App-header"> 
      </header>
      <main style={{minHeight: '100vh'}}>
        {/* <ConsultorioForm /> */}
        <UsuarioForm />
      </main>
    </div>
  );
};


export default App;
