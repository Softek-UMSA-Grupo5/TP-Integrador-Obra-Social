
import { Outlet } from 'react-router-dom';
import { useUser } from '../assets/contexts/UserContext';
import useTokenRefresh from '../hooks/useTokenRefresh';
import useInactivityTimeout from '../hooks/useInactivityTimeout';
import ResponsiveAppBar from '../components/landingPage/ResponsiveAppBar';
import ResponsiveFooter from '../components/landingPage/ResponsiveFooter';

const LandingPage = () => {
    const {user} = useUser();

    const handleTimeout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if(user){
        useTokenRefresh();
        useInactivityTimeout(30 * 60 * 1000, handleTimeout);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <div id="detail">
                <Outlet />
            </div>
            <ResponsiveFooter />
        </div>
    );
};

export default LandingPage;
