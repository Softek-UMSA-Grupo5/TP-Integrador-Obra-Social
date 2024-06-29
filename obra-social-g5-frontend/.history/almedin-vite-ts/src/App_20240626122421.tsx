import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConsultorioPage from './pages/ConsultorioPage';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path="/" exact>
                </Route> */}
                <Route path="/consultorios">
                    <ConsultorioPage />
                </Route>
                {/* Otras rutas según sea necesario */}
            </Switch>
        </Router>
    );
};


export default App;
