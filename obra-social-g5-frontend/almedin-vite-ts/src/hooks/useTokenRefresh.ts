import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../assets/axios/UsuarioApi';
import { useUser } from '../assets/contexts/UserContext';

const useTokenRefresh = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await refreshToken(user);
                localStorage.setItem('token', response.token);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/');
            }
        };

        refresh();

        const interval = setInterval(refresh, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, [navigate, user]);
};

export default useTokenRefresh;
