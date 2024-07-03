import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../assets/axios/UsuarioApi';
import { useUser } from '../assets/contexts/UserContext';

const useTokenRefresh = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(
            async () => {
                try {
                    refreshToken(user).then((response) =>
                        localStorage.setItem('token', response.token)
                    );
                } catch (error) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            },
            15 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, [navigate]);
};

export default useTokenRefresh;
