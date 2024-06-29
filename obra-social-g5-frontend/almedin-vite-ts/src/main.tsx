import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.tsx'
import LandingPage from './components/landingPage/LandingPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLogin from './components/userLogin/UserLogin';
import { UserProvider } from './assets/contexts/UserContext';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <UserLogin />,
    },
    {
        path: '/',
        element: <LandingPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>
);
