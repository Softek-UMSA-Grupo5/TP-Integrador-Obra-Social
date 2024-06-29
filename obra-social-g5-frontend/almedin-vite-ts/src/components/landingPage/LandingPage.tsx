import ResponsiveAppBar from './ResponsiveAppBar';
import ResponsiveMain from './ResponsiveMain';
import ResponsiveFooter from './ResponsiveFooter';

const LandingPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <ResponsiveMain />
            <ResponsiveFooter />
        </div>
    );
};

export default LandingPage;
