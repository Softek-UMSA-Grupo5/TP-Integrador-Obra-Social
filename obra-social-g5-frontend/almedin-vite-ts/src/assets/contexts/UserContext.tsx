import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MedicoResponseDto } from '../models/Medico';
import { RecepcionistaResponseDto } from '../models/Recepcionista';
import { SocioResponse } from '../models/Socio';

export interface User {
    id: number;
    username: string;
    rol: string;
    userData: SocioResponse | MedicoResponseDto | RecepcionistaResponseDto;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    React.useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
