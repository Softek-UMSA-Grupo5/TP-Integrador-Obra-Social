import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveFooter from './ResponsiveFooter';
import { Outlet } from 'react-router-dom';

const LandingPage = () => {

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
