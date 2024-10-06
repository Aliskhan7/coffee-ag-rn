// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextProps {
    user: User | null | undefined;
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            setUser(userAuth || null);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

// Экспортируем хук useAuth
export const useAuth = () => {
    return useContext(AuthContext);
};
