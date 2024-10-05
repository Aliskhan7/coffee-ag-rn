// app/auth/_layout.tsx
import React, { useContext } from 'react';
import { Slot, useRouter } from 'expo-router';
import { AuthContext } from '@/Context/AuthContext';

export default function AuthLayout() {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    if (user) {
        // Если пользователь уже аутентифицирован, перенаправляем на главную страницу
        router.replace('/');
        return null;
    }

    // Если пользователь не аутентифицирован, рендерим страницы входа и регистрации
    return <Slot />;
}
