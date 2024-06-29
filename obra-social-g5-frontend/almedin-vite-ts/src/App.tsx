import React from 'react';
import { Router } from './routes/Router';
import { UserProvider } from './assets/contexts/UserContext';
import useTokenRefresh from './hooks/useTokenRefresh';
import useInactivityTimeout from './hooks/useInactivityTimeout';

const App: React.FC = () => {

    useTokenRefresh();

    const handleTimeout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    useInactivityTimeout(30 * 60 * 1000, handleTimeout);

    return (
        <UserProvider>
            <Router />
        </UserProvider>
    );
};

export default App;
