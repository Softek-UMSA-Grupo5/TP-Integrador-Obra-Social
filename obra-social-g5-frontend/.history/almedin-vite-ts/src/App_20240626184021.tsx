import React, { useState, useEffect } from 'react';
import UsuarioForm from './components/Usuario/UsuarioForm'; // Ajusta la ruta según tu estructura de archivos
import { getAllMedicos } from './axios/MedicoApi';
import { getAllConsultorios } from './axios/ConsultorioApi';

const App = () => {
    const [medicos, setMedicos] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const medicosData = await getAllMedicos();
                const consultoriosData = await getAllConsultorios();
                setMedicos(medicosData);
                setConsultorios(consultoriosData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <UsuarioForm medicos={medicos} consultorios={consultorios} />
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default App;
