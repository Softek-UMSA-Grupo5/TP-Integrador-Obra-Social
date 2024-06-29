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
        <UsuarioForm style={{minHeight: '100vh'}}/>
      </main>
    </div>
  );
};


export default App;
