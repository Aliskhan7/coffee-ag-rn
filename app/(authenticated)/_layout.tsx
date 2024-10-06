// app/(auth)/_layout.tsx
import React, { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { useAuth } from '@/Context/AuthContext';

export default function AuthLayout() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user]);

    return <Slot />;
}
