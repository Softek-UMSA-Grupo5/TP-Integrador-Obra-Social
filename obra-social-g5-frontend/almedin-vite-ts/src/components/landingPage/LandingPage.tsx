import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveFooter from './ResponsiveFooter';
import useTokenRefresh from '../../hooks/useTokenRefresh';
import useInactivityTimeout from '../../hooks/useInactivityTimeout';
import { Outlet } from 'react-router-dom';

const LandingPage = () => {
    useTokenRefresh();

    const handleTimeout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    useInactivityTimeout(30 * 60 * 1000, handleTimeout);

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
