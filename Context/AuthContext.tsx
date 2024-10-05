// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextProps {
    user: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            setUser(userAuth || null);
        });
        return unsubscribe;
    }, []);

    if (user === undefined) {
        // Пока загружается состояние аутентификации, можно вернуть индикатор загрузки или null
        return null;
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
