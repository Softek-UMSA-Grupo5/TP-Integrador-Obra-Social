import * as React from 'react';
import { AppBar, Box ,Toolbar ,IconButton ,Typography ,Menu ,Container ,Avatar ,Button ,Tooltip ,MenuItem, Link as MuiLink, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../assets/contexts/UserContext';
import { rolOptions, pages } from '../../configurations/pages.settings';

export default function ResponsiveAppBar() {
    const { user } = useUser();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {!user && <NavMenuDesplegable />}
                    <Logo xs={'flex'} md={'none'} flexGrow={1} />
                    {!user && <NavLinks />}

                    {!user && <LoginButton />}

                    {user && <UserMenuDesplegable />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

interface LogoProps {
    xs: string;
    md: string;
    flexGrow: number;
}

const Logo: React.FC<LogoProps> = ({ xs, md, flexGrow }) => {
    return (
        <>
            <LocalHospitalIcon sx={{ display: { xs: { xs }, md: { md } }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                    display: { xs: { xs }, md: { md } },
                    flexGrow: { flexGrow },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                ALMEDIN
            </Typography>
        </>
    );
};

const NavMenuDesplegable = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit">
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}>
                    {pages.map((page, index) => (
                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                            <MuiLink
                                key={index}
                                href={page.href}
                                variant="body2"
                                sx={{
                                    color: 'black',
                                    mx: 2,
                                    fontSize: 16,
                                    textDecoration: 'none',
                                }}>
                                {page.nombre}
                            </MuiLink>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </>
    );
};

const UserMenuDesplegable = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { user } = useUser();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.href != '/') {
            navigate('/');
        }
        location.reload();
    };

    const handleNavigate = (href: string) => {
        navigate(href);
    };
    return (
        <>
            <Box sx={{ ml: 'auto' }}>
                <Tooltip title="Open rolOptions">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    <MenuItem onClick={() => handleNavigate('/')}>
                        <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    {rolOptions[user?.rol].map((setting, index) => (
                        <MenuItem key={index} onClick={() => handleNavigate(setting.href)}>
                            <Typography textAlign="center">{setting.nombre}</Typography>
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Cerrar Sesión</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};

const LoginButton = () => {
    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Paper elevation={3}>
                    <Link to="/login">
                        <Button variant="outlined" color="primary">
                            Login
                        </Button>
                    </Link>
                </Paper>
            </Box>
        </>
    );
};

const NavLinks = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (
                    <MuiLink
                        key={index}
                        href={page.href}
                        variant="body2"
                        sx={{ color: 'white', mx: 2, fontSize: 16 }}>
                        {page.nombre}
                    </MuiLink>
                ))}
            </Box>
        </>
    );
};
