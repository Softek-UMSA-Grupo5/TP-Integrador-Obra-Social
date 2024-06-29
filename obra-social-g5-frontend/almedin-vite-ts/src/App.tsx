import React from 'react';
import { Router } from './routes/Router';
import { UserProvider } from './assets/contexts/UserContext';

const App: React.FC = () => {
    return (
        <UserProvider>
            <Router />
        </UserProvider>
    );
};

export default App;
