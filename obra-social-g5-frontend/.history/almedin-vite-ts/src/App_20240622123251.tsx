import React from 'react';
import AddNewOfficeForm from './component/AddNewOfficeForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación de Consultorios Médicos</h1>
      </header>
      <main>
        <AddNewOfficeForm />
      </main>
    </div>
  );
};

export default App;
