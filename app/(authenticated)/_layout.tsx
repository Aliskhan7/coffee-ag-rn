// app/(authenticated)/_layout.tsx
import React, { useContext } from 'react';
import { Slot, useRouter } from 'expo-router';
import { AuthContext } from '@/Context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function AuthenticatedLayout() {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    if (user === undefined) {
        // Показываем индикатор загрузки, пока состояние аутентификации не определено
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        router.replace('/auth/login');
        return null;
    }

    // Если пользователь аутентифицирован, рендерим дочерние компоненты
    return <Slot />;
}
